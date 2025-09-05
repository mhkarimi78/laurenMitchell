'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from '../../public/Logo.png'
import { LuCalendarClock } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const router = useRouter();
  const [hasJwt, setHasJwt] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasJwt(!!localStorage.getItem("jwt"));
    }
  }, []);

  // دکمه رزرو و پروفایل با استایل هماهنگ
  const buttonClass =
    "flex items-center gap-2 rounded-full px-5 py-2 font-bold shadow transition text-white bg-laurenBlue hover:bg-laurenBlue/80 focus:outline-none focus:ring-2 focus:ring-laurenBlue/50";

  return (
    <header className="mx-auto flex w-full h-28 min-h-28 max-h-28 items-center justify-between p-4 gap-8 bg-white shadow">
      <Image
        src={logo}
        alt="لوگوی کلینیک میثم"
        width={0}
        height={0}
        sizes="100vw"
        className="max-h-full h-full w-auto cursor-pointer"
        priority
        onClick={() => router.push('/')}
      />

      <div className="flex items-center gap-4 w-auto">
        <button
          className={buttonClass}
          onClick={() => {
            const jwt = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
            if (jwt) {
              router.push("/reserve");
            } else {
              router.push("/login");
            }
          }}
        >
          <LuCalendarClock className="text-xl" />
          رزرو وقت مشاوره
        </button>
        {hasJwt && (
          <button
            className={buttonClass + " text-laurenBlue border border-laurenBlue hover:bg-laurenBlue hover:text-white"}
            onClick={() => router.push("/profile")}
          >
            <FaUserCircle className="text-xl" />
            پروفایل
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;