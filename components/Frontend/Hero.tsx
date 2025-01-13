import React from "react";

const Hero = () => {
  return (
    <div className="bg-[#E#EDF] mt-4">
      <div className="container grid md:grid-cols-2 py-8">
        <div className="flex items-center">
          <p className="max-w-[450px] space-y-4">
            y starting at <span>$999.00</span>
          </p>
          <h1 className="text-topHeadingPrimary font-bold text-4xl md:text-5xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <h3 className="text-2xl font-['Oregano', cursive]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos{" "}
            <span>-10%</span> qui magnam voluptates eum optio non.
          </h3>
          <a
            href="#"
            className="inline-block bg-white rounded-md px-6 py-3 hover:bg-accent hover:text-white"
          >
            Shop Now
          </a>
        </div>
      </div>

      <div className="">
        <img src="/hero.png" alt="hero" className="ml-auto" />
      </div>
    </div>
  );
};

export default Hero;
