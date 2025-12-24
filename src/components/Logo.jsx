import React from "react";
import logoImg from "../../public/assets/CE-Logo-Icon.png";
import Image from "next/image";
const Logo = () => {
  return (
    <div>
      <div className="flex justify-center items-center gap-2 py-2 px-3 bg-white w-62.5 barlow rounded-lg">
        <Image src={logoImg} alt="CareEase Logo" className="w-12"></Image>
        <h1 className="text-4xl font-bold text-primary">
          <span className="text-accent">Care</span>Ease
        </h1>
      </div>
    </div>
  );
};

export default Logo;
