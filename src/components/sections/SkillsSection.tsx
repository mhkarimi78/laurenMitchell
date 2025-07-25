import Image from "next/image";
import React from "react";

import Consultorio from "../../../public/consultorio-01.jpeg";

const skills: { title: string; text: string }[] = [
  {
    title: "نوآوری دیجیتال",
    text: "استفاده از فناوری‌های پیشرفته برای ایجاد برنامه‌های درمانی شخصی‌سازی‌شده.",
  },
  {
    title: "ارتودنسی پیشگیرانه",
    text: "مداخلات زودهنگام برای پیشگیری از مشکلات ارتودنسی.",
  },
  {
    title: "درمان نامحسوس",
    text: "تخصص در گزینه‌های زیبایی برای اصلاح نامحسوس و راحت.",
  },
  {
    title: "مراقبت از کودکان",
    text: "خدمات تخصصی برای کودکان، تضمین لبخندی سالم.",
  },
  {
    title: "هماهنگی فکی",
    text: "رویکردی که به‌طور دقیق ناهماهنگی‌های موقعیت فک‌ها را اصلاح می‌کند.",
  },
  {
    title: "همکاری جراحی",
    text: "همکاری با جراحان فک و صورت برای موارد جراحی.",
  },
];

const SkillsSection = () => {
  return (
    <section className="mb-10 w-full max-w-[90%] mx-auto">
      <Image
        src={Consultorio}
        width={0}
        height={0}
        sizes="100vw"
        alt="کلینیک"
        className="w-full h-full max-h-44 md:max-h-72 object-cover rounded-t-3xl"
      />

      <div className="bg-[#F5F5F5] w-full h-fit flex flex-col items-center justify-center py-10 rounded-b-3xl">
        <h2 className="font-semibold text-xl md:text-2xl text-center">
          <span className="font-light">ویژگی‌ها و</span> تخصص‌های کلینیک میثم
        </h2>

        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-[90%] lg:w-[60rem] mx-auto ">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center gap-2 w-full max-w-xs md:max-w-none mx-auto"
            >
              <h3 className="font-bold text-laurenBlue text-xl">
                {skill.title}
              </h3>
              <p className="font-light text-sm lg:px-20 ">{skill.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
