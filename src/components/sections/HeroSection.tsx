import Image from "next/image";
import React from "react";

import Lauren from "../../../public/lauren-01.png";

const HeroSection = () => {
  return (
    <section className="w-full max-w-[90%] mx-auto flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-32 mb-10">
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <h1 className="uppercase text-2xl md:text-4xl font-black text-laurenBlue">
          با اعتماد به نفس لبخند بزنید
        </h1>
        <p className="font-light text-xl md:text-2xl w-full max-w-xs md:max-w-sm">
          سفر شما به سوی لبخندی بی‌نقص از اینجا آغاز می‌شود!
        </p>
        <p className="font-light text-sm">
          دکتر لورن میچل - سائو ژوزه دوس کامپوس - SP <br />
          CRO 00000 – SP
        </p>
      </div>

      <Image
        src={Lauren}
        width={0}
        height={0}
        sizes="100vw"
        alt="دکتر لورن"
        className="w-80 lg:w-96 h-auto"
      />
    </section>
  );
};

export default HeroSection;