"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

import Mohammad from "../../../public/lauren-02.jpeg";
import { LuCalendarClock } from "react-icons/lu";
import ReserveButton from "@/components/ReserveButton";

const AboutSection = () => {
  const router = useRouter();

  return (
    <section className="w-full max-w-[90%] mx-auto flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-32 mb-10">
      <Image
        src={Mohammad}
        width={0}
        height={0}
        sizes="100vw"
        alt="کلینیک میثم"
        className="w-80 lg:w-96 h-auto"
      />

      <div className="flex flex-col items-center justify-center text-center gap-4">
        <h3 className="text-2xl lg:text-3xl font-light">
          درباره <span className="font-semibold">کلینیک  </span>
        </h3>
        {/* <p className="font-light w-full max-w-xs md:max-w-sm">CRO 00000 – SP</p> */}
        <p className="font-light text-sm w-full max-w-xs md:max-w-sm lg:max-w-md">
          در کلینیک دندانپزشکی میثم، دکتر ها با اشتیاق و تجربه خود
          لبخندهایی درخشان و با اعتماد به نفس خلق می‌کنند. با بیش از ۱۰ سال تعهد به
          ارتودنسی، او به عنوان متخصصی برجسته در تغییر نه تنها دندان‌ها، بلکه زندگی‌ها
          می‌درخشد. ساعات کاری: هر روز ۱۰ صبح تا ۷ عصر، به جز تعطیلات رسمی. ما را در
          اینستاگرام دنبال کنید: @meysam_dentistry
        </p>
        <p className="text-xl lg:text-2xl font-black text-laurenBlue">
          بیش از ۳۰۰۰ لبخند تحول‌یافته!
        </p>

        <ReserveButton />
      </div>
    </section>
  );
};

export default AboutSection;