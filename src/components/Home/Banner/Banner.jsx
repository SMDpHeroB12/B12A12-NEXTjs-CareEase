import Logo from "@/components/Logo";
import React from "react";

const Banner = () => {
  return (
    <div>
      <section className="min-h-[60vh] flex items-center justify-center bg-secondary text-white">
        <div className="text-center px-4 flex flex-col justify-center items-center">
          <Logo></Logo>
          <p className="mt-4 max-w-xl mx-auto">
            Trusted baby sitting, elderly care and sick person care services.
          </p>
          <button className="btn btn-neutral text-white mt-6">
            Explore Services
          </button>
        </div>
      </section>
    </div>
  );
};

export default Banner;
