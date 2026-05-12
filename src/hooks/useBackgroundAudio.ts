import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Howl } from "howler";

type AudioStatus =
  | "loading"
  | "ready"
  | "playing"
  | "pausing"
  | "paused"
  | "error";

type AudioError = {
  phase: "load" | "play";
  message: string;
};

type UseBackgroundAudioOptions = {
  src: string | string[];
  volume?: number;
  loop?: boolean;
  html5?: boolean;
  preload?: boolean | "metadata";
  fadeDurationMs?: number;
};

const DEFAULT_VOLUME = 0.55;
const DEFAULT_FADE_DURATION_MS = 450;

const clampVolume = (value: number) => Math.min(1, Math.max(0, value));

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return String(error ?? "Unknown audio error");
};

export const useBackgroundAudio = ({
  src,
  volume = DEFAULT_VOLUME,
  loop = true,
  html5 = true,
  preload = true,
  fadeDurationMs = DEFAULT_FADE_DURATION_MS,
}: UseBackgroundAudioOptions) => {
  const soundRef = useRef<Howl | null>(null);
  const soundIdRef = useRef<number | null>(null);
  const pauseTimerRef = useRef<number | null>(null);
  const [status, setStatus] = useState<AudioStatus>("loading");
  const [error, setError] = useState<AudioError | null>(null);

  const sources = useMemo(() => (Array.isArray(src) ? src : [src]), [src]);
  const normalizedVolume = clampVolume(volume);

  const clearPendingPause = useCallback(() => {
    if (pauseTimerRef.current === null) {
      return;
    }

    window.clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = null;
  }, []);

  useEffect(() => {
    clearPendingPause();
    soundIdRef.current = null;

    const sound = new Howl({
      src: sources,
      loop,
      html5,
      preload,
      volume: normalizedVolume,
      onload: () => {
        setError(null);
        setStatus((currentStatus) =>
          currentStatus === "loading" || currentStatus === "error"
            ? "ready"
            : currentStatus,
        );
      },
      onplay: (soundId) => {
        soundIdRef.current = soundId;
        setStatus("playing");
        setError(null);
      },
      onpause: () => {
        setStatus("paused");
      },
      onstop: () => {
        setStatus("paused");
      },
      onloaderror: (_soundId, loadError) => {
        setStatus("error");
        setError({ phase: "load", message: getErrorMessage(loadError) });
      },
      onplayerror: (_soundId, playError) => {
        setStatus("error");
        setError({ phase: "play", message: getErrorMessage(playError) });
      },
    });

    soundRef.current = sound;

    return () => {
      clearPendingPause();
      sound.unload();

      if (soundRef.current === sound) {
        soundRef.current = null;
      }
    };
  }, [
    clearPendingPause,
    html5,
    loop,
    normalizedVolume,
    preload,
    sources,
  ]);

  useEffect(() => {
    const sound = soundRef.current;

    if (!sound) {
      return;
    }

    sound.volume(normalizedVolume);

    const soundId = soundIdRef.current;
    if (soundId !== null) {
      sound.volume(normalizedVolume, soundId);
    }
  }, [normalizedVolume]);

  const play = useCallback(() => {
    const sound = soundRef.current;

    if (!sound) {
      return;
    }

    clearPendingPause();
    setError(null);

    const currentSoundId = soundIdRef.current;
    if (currentSoundId !== null && sound.playing(currentSoundId)) {
      setStatus("playing");

      if (fadeDurationMs > 0) {
        const currentVolume = sound.volume(currentSoundId);
        const fadeFrom =
          typeof currentVolume === "number" ? currentVolume : normalizedVolume;
        sound.fade(fadeFrom, normalizedVolume, fadeDurationMs, currentSoundId);
        return;
      }

      sound.volume(normalizedVolume, currentSoundId);
      return;
    }

    const soundId =
      currentSoundId === null ? sound.play() : sound.play(currentSoundId);
    soundIdRef.current = soundId;

    if (fadeDurationMs > 0) {
      sound.volume(0, soundId);
      sound.fade(0, normalizedVolume, fadeDurationMs, soundId);
      return;
    }

    sound.volume(normalizedVolume, soundId);
  }, [clearPendingPause, fadeDurationMs, normalizedVolume]);

  const pause = useCallback(() => {
    const sound = soundRef.current;
    const soundId = soundIdRef.current;

    if (!sound || soundId === null) {
      return;
    }

    clearPendingPause();

    if (!sound.playing(soundId)) {
      setStatus("paused");
      return;
    }

    if (fadeDurationMs <= 0) {
      sound.pause(soundId);
      return;
    }

    setStatus("pausing");
    const currentVolume = sound.volume(soundId);
    const fadeFrom =
      typeof currentVolume === "number" ? currentVolume : normalizedVolume;
    sound.fade(fadeFrom, 0, fadeDurationMs, soundId);
    pauseTimerRef.current = window.setTimeout(() => {
      if (soundIdRef.current === soundId && sound.playing(soundId)) {
        sound.pause(soundId);
      }

      pauseTimerRef.current = null;
    }, fadeDurationMs);
  }, [clearPendingPause, fadeDurationMs, normalizedVolume]);

  const toggle = useCallback(() => {
    const sound = soundRef.current;
    const soundId = soundIdRef.current;
    const isActuallyPlaying =
      sound !== null && soundId !== null && sound.playing(soundId);

    if (isActuallyPlaying && pauseTimerRef.current === null) {
      pause();
      return;
    }

    play();
  }, [pause, play]);

  return {
    error,
    isLoading: status === "loading",
    isPlaying: status === "playing",
    pause,
    play,
    status,
    toggle,
  };
};
