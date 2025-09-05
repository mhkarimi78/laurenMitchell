"use client";

import Image from "next/image";
import React from "react";
import { HiStar, HiLocationMarker, HiPhone } from "react-icons/hi";
import Lauren from "../../../public/lauren-03.jpeg";
import { LuCalendarClock } from "react-icons/lu";
import { useRouter } from "next/navigation";
import ReserveButton from "@/components/ReserveButton";

const depos: { name: string; text: string }[] = [
	{
		name: "نفیسه حیدر",
		text: "واقعاً از کار کلینیک میثم راضی‌ام! لبخندم خیلی بهتر شده و اصلاً باورم نمیشه اینقدر تغییر کرده. خیلی با حوصله و دقیقن و حس خوبی به آدم میدن. حتماً پیشنهادشون می‌کنم!",
	},
	{
		name: "احمدرضا حمیدی فرد",
		text: "درمان ارتودنسی‌ام با کلینیک میثم تو کلینیک میثم عالی بود! نتیجه‌ش فوق‌العاده‌ست و تیمشون خیلی گرم و صمیمی‌ان. اگه دنبال یه جای خوب برای دندوناتون هستید، اینجا رو امتحان کنید!",
	},
	{
		name: "مهسا کریمی",
		text: " کلینیک میثم تو کلینیک میثم حسابی حالمو خوب کرد! لبخندم خیلی قشنگ شده و همیشه با دقت به حرفام گوش دادن. واقعاً انتخاب درستی بود، خیلی خوشحالم از نتیجه!",
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
	const router = useRouter();

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
						کلینیک دندانپزشکی میثم
					</h3>

					<div className="flex items-center justify-center gap-2">
						<HiLocationMarker size={30} className="text-laurenBlue" />

						<p className="text-xs md:text-sm">
							محلاتی (آهنگ)،خيابان شاه آبادى جنوبى، خيابان مير هاشمى، کوچه ده
							مترى فاطميه، پلاک ۶{" "}
						</p>
					</div>

					<div className="flex items-start justify-start gap-2">
						<HiPhone size={30} className="text-laurenBlue" />

						<p className="text-xs md:text-sm">021-33700979 | 09924441066</p>
					</div>

					<ReserveButton />
				</div>
			</div>
		</section>
	);
};

export default DepoSection;
