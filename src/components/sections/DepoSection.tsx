import Image from "next/image";
import React from "react";
import { HiStar, HiLocationMarker, HiPhone } from "react-icons/hi";
import Lauren from "../../../public/lauren-03.png";
import { LuCalendarClock } from "react-icons/lu";

const depos: { name: string; text: string }[] = [
  {
    name: "گیلرمه بوستامانته",
    text: "من از درمان با دکتر لورن بسیار راضی هستم! لبخندم هرگز اینقدر زیبا نبوده است. او حرفه‌ای، внимательный و همیشه مطمئن می‌شود که من راحت هستم، توصیه می‌کنم!",
  },
  {
    name: "لوآنا اولیویرا",
    text: "درمان ارتودنسی با دکتر لورن فوق‌العاده بود. نتیجه شگفت‌انگیز است و تیم او بسیار مهربان هستند. این کار بی‌نقص را به همه توصیه می‌کنم!",
  },
  {
    name: "زوئه سانتوس",
    text: "دکتر لورن زندگی من را تغییر داد. مراقبت و توجه او بی‌نظیر است. از لبخند جدیدم بسیار خوشحال هستم. بدون شک، بهترین انتخاب!",
  },
];

const convenios: { src: string }[] = [
  {
    src: "/convenio-01.png",
  },
  {
    src: "/convenio-02.png",
  },
  {
    src: "/convenio-03.png",
  },
  {
    src: "/convenio-04.png",
  },
  {
    src: "/convenio-05.png",
  },
];

const DepoSection = () => {
  return (
    <section className="w-full max-w-[90%] mx-auto min-h-screen">
      <h3 className="font-black text-laurenBlue text-center text-2xl uppercase">
        بیایید لبخند خود را متحول کنید!
      </h3>
      <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap items-center justify-center gap-4 my-7 select-none">
        {depos.map((depo, index) => (
          <div
            key={index}
            className="lg:w-[400px] md:w-full h-fit rounded-3xl bg-[#F5F5F5] flex flex-col items-center justify-center text-center p-5 gap-3"
          >
            <h4 className="font-semibold text-lg">{depo.name}</h4>
            <p className="text-sm">{depo.text}</p>
            <div className="flex items-center gap-1">
              {Array(5)
                .fill(1)
                .map((_, index) => (
                  <HiStar key={index} size={30} className="text-yellow-400" />
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-5 mb-7">
        {convenios.map((convenio, index) => (
          <Image
            src={convenio.src}
            alt="بیمه"
            key={index}
            width={0}
            height={0}
            sizes="100vw"
            className="w-28 md:w-44 h-auto aspect-video object-contain"
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Image
          src={Lauren}
          alt="لورن"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full md:max-w-[40%] h-auto object-contain"
        />

        <div className="flex flex-col items-start justify-start text-center md:text-start gap-3 w-full md:max-w-[60%]">
          <span className="font-light text-2xl justify-center items-center mx-auto md:mx-0">
            موقعیت و تماس
          </span>
          <h3 className="font-bold text-2xl md:text-3xl lg:text-5xl">
            کلینیک دندانپزشکی دکتر لورن میچل
          </h3>

          <div className="flex items-center justify-center gap-2">
            <HiLocationMarker size={30} className="text-laurenBlue" />

            <p className="text-xs md:text-sm">
              خیابان سلامت، ۴۵۶ - ژاردیم داس ایندوستریاس، SJC - SP
            </p>
          </div>

          <div className="flex items-start justify-start gap-2">
            <HiPhone size={30} className="text-laurenBlue" />

            <p className="text-xs md:text-sm">
              +۵۵ (۱۲) ۰۰۰۰-۰۰۰۰ | +۵۵ (۱۲) ۹۰۰۰۰-۰۰۰۰
            </p>
          </div>

          <button className="rounded-2xl bg-laurenBlue w-full py-4 text-xs font-bold text-white transition-all duration-300 ease-in-out hover:bg-laurenBlue/80 flex items-center justify-center gap-2">
            رزرو وقت مشاوره <LuCalendarClock size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DepoSection;