import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"], // Persian is supported under the 'arabic' subset
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap", // Ensures smooth font loading
});

export const metadata: Metadata = {
  title: "کلینیک دندانپزشکی میثم | ارتودنسی تخصصی برای لبخندهای سالم",
  description:
    "کلینیک دندانپزشکی میثم با مدیریت دکتر محمد روستایی، متخصص ارتودنسی، به خلق لبخندهای سالم و با اعتماد به نفس اختصاص دارد. ما درمان‌های ارتودنسی شخصی‌سازی‌شده را برای بیماران در تمام سنین ارائه می‌دهیم. ساعات کاری: هر روز ۱۰ صبح تا ۷ عصر، به جز تعطیلات رسمی. ما را در اینستاگرام دنبال کنید: @meysam_dentistry",
  keywords:
    "ارتودنسی, دندانپزشک, درمان ارتودنسی, لبخندهای سالم, متخصص ارتودنسی, کلینیک دندانپزشکی, بریس دندان, اصلاح دندان, محمد روستایی, کلینیک میثم, سلامت دهان, تراز دندان, بریس نامرئی, دندانپزشکی زیبایی, مراقبت‌های دندانی, ارتودنسی کودکان, پیشگیری دندانپزشکی, بهداشت دهان, الاینرهای شفاف, سلامت دندان, زیبایی لبخند, ارتودنسی بزرگسالان, تراز دندان‌ها, دندان‌های صاف, ارتودنسی پیشرفته, ارتودنسی مدرن, فناوری دندانپزشکی, کلینیک دندانپزشکی, معاینات ارتودنسی, اصلاح دندان, هماهنگی چهره, ارتودنسی پیشگیرانه, بریس ثابت, درمان دندانپزشکی, سلامت دهان, تسکین درد دندان, معاینات منظم, زیبایی چهره, رادیوگرافی دندان, مراقبت از دندان‌ها, ارتودنسی مداخله‌ای, لبخند بی‌نقص, طرح درمان, راحتی دندانپزشکی, بریس متحرک, معاینات دهان, چکاپ‌های دندانی, اندودنتیکس",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body className={vazirmatn.className + " flex flex-col min-h-screen"}>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}