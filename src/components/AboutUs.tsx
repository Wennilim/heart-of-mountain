import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AboutUsModal } from "./AboutUsModal";

export const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isModalOpen && <AboutUsModal setIsModalOpen={setIsModalOpen} />}
      </AnimatePresence>
      <div className="flex flex-col sm:flex-row gap-4 mt-24 sm:mt-0 p-6 xl:p-12">
        <div className="flex flex-col gap-4 lg:gap-8 max-w-xl">
          <h2 className="text-white text-3xl md:text-4xl font-fjalla uppercase">
            What if my grand-
            <br />
            mother is <br />
            still alive?...
          </h2>
          <p className="text-white text-lg md:text-xl max-w-md">
            "I know it might sound crazy, but that’s why I need your help. All
            I’m asking is that you hear me out."
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 cursor-pointer font-fjalla duration-300 transition-color ease-in-out delay-75 text-white bg-transparent border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition-colors duration-300 max-w-40"
          >
            LEARN MORE
          </button>
        </div>
        <img
          src="/images/imgi_6_683ccb9761cd08b273fef1ac_68096e583872f04299c3cbe3_heart-of-the-mountain-hazel-ivy.jpg"
          alt="About Us"
          className="w-fit sm:w-72 lg:w-96 lg:h-96 object-cover rounded-2xl"
        />
      </div>
    </>
  );
};
