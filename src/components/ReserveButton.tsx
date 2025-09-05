"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuCalendarClock } from "react-icons/lu";

const ReserveButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      const jwt = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
      if (jwt) {
        router.push("/reserve");
      } else {
        router.push("/login");
      }
      setLoading(false);
    }, 700);
  };

  return (
    <button
      className="rounded-2xl bg-laurenBlue w-full p-4 text-xs font-bold text-white transition-all duration-300 ease-in-out hover:bg-laurenBlue/80 flex items-center justify-center gap-2 relative"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      ) : (
        <>
          رزرو وقت مشاوره <LuCalendarClock size={24} />
        </>
      )}
    </button>
  );
};

export default ReserveButton;