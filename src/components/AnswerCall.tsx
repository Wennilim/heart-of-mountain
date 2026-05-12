export const AnswerCall = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-24 sm:mt-0 p-6 xl:p-12">
      <img
        src="/images/imgi_5_685ed4789ee19018959c7b1b_6812a789ae94dd2da110f847_heart-of-the-mountain-game-details.png"
        alt="Answer the call"
        className="w-fit sm:w-72 lg:w-96 lg:h-96 object-cover rounded-2xl"
      />
      <div className="flex flex-col gap-4 lg:gap-8 max-w-xl">
        <h2 className="text-white text-3xl md:text-4xl font-fjalla uppercase">
          Like nothing you’ve <br />
          experienced before.
        </h2>
        <p className="text-white text-lg md:text-xl max-w-md">
          Be the hero in your own live-action, puzzle adventure. Journey deep
          into the unknown and work together to uncover the secrets of the
          mountain!
        </p>
      </div>
    </div>
  );
};
