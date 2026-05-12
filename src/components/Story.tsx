export const Story = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-24 sm:mt-0 p-6 xl:p-12">
      <div className="flex flex-col gap-4 lg:gap-8 max-w-xl">
        <h2 className="text-white text-3xl md:text-4xl font-fjalla uppercase">
          The mountain needs you. <br/>Alice needs you.
        </h2>
        <p className="text-white text-lg md:text-xl max-w-md">
          In 1957 renowned conservationist Alice Ivy and her team ventured deep
          into the wilds searching for an energy source so powerful — it could
          change the world.
          <br />
          <br />
          She never came back.
        </p>
      </div>
      <img
        src="/images/imgi_4_683ccb99d3d0c375fc9db333_6757edddb4d6566e0a6bab99_alice-img.png"
        alt="Alice Ivy"
        className="w-fit sm:w-72 lg:w-96 lg:h-96 object-cover rounded-2xl"
      />
    </div>
  );
};
