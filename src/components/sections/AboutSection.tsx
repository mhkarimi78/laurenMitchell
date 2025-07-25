import Image from "next/image";
import React from "react";

import Lauren from "../../../public/lauren-02.png";

import { LuCalendarClock } from "react-icons/lu";

const AboutSection = () => {
  return (
    <section className="w-full max-w-[90%] mx-auto flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-32 mb-10">
      <Image
        src={Lauren}
        width={0}
        height={0}
        sizes="100vw"
        alt="دکتر لورن"
        className="w-80 lg:w-96 h-auto"
      />

      <div className="flex flex-col items-center justify-center text-center gap-4">
        <h3 className="text-2xl lg:text-3xl font-light">
          درباره <span className="font-semibold">دکتر لورن میچل</span>
        </h3>
        <p className="font-light w-full max-w-xs md:max-w-sm">CRO 00000 – SP</p>
        <p className="font-light text-sm w-full max-w-xs md:max-w-sm lg:max-w-md">
          در دنیایی که هر لبخند منحصر به فرد است، دکتر لورن میچل با اشتیاق و
          تجربه خود لبخندهایی درخشان و با اعتماد به نفس خلق می‌کند. با بیش از ۱۰
          سال تعهد به ارتودنسی، او به عنوان متخصصی برجسته در تغییر نه تنها
          دندان‌ها، بلکه زندگی‌ها می‌درخشد.
        </p>
        <p className="text-xl lg:text-2xl font-black text-laurenBlue">
          بیش از ۳۰۰۰ لبخند تحول‌یافته!
        </p>

        <button className="rounded-2xl bg-laurenBlue w-full py-4 text-xs font-bold text-white transition-all duration-300 ease-in-out hover:bg-laurenBlue/80 flex items-center justify-center gap-2">
          رزرو وقت مشاوره <LuCalendarClock size={24} />
        </button>
      </div>
    </section>
  );
};

export default AboutSection;