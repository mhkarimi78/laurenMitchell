import Image from "next/image";
import React from "react";

import Consultorio from "../../../public/consultorio-02.jpeg";
import { BsFillPatchCheckFill } from "react-icons/bs";

const items: { title: string; text: string }[] = [
  {
    title: "محیط دلپذیر",
    text: "طراحی شده برای ایجاد فضایی گرم و آرامش‌بخش برای بیماران.",
  },
  {
    title: "تکنولوژی پیشرفته",
    text: "مجهز به فناوری‌های روز دنیا برای ارائه بهترین خدمات به بیماران.",
  },
  {
    title: "رویکرد شخصی‌سازی‌شده",
    text: "برنامه درمانی به دقت مطابق با نیازهای فردی تنظیم می‌شود.",
  },
  {
    title: "پشتیبانی استثنایی پس از درمان",
    text: "دکتر لورن همیشه برای پاسخ به سؤالات و ارائه راهنمایی در دسترس است.",
  },
  {
    title: "زمان‌بندی انعطاف‌پذیر",
    text: "ما انعطاف‌پذیری در برنامه‌ریزی ارائه می‌دهیم تا با نیازهای شما هماهنگ باشد.",
  },
];

const ClinicSection = () => {
  return (
    <section className="w-full max-w-[90%] mx-auto bg-[#F5F5F5] pt-8 rounded-3xl">
      <h2 className="font-light text-2xl md:text-4xl text-center">
        با کلینیک بیشتر آشنا شوید
      </h2>
      <div className="mb-10 bg-[#F5F5F5] flex flex-col lg:flex-row items-center justify-around pb-10 px-5 rounded-3xl gap-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-start justify-start py-6 gap-6">
            {items.map((item, index) => (
              <div
                className="flex items-center justify-center gap-6 p-2 w-full max-w-md"
                key={index}
              >
                <span>
                  <BsFillPatchCheckFill size={70} className="text-laurenBlue" />
                </span>

                <div className="flex flex-col items-start justify-start gap-1 w-full">
                  <h3 className=" md:text-xl font-medium">{item.title}</h3>
                  <p className="font-light text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Image
          src={Consultorio}
          width={0}
          height={0}
          sizes="100vw"
          alt="کلینیک"
          className="w-full lg:max-w-[50%] max-h-lvh object-cover md:px-10 lg:px-0"
        />
      </div>
    </section>
  );
};

export default ClinicSection;