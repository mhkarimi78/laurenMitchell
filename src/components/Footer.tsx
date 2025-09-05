import Image from "next/image";
import Link from "next/link";

import logo from "../../public/Logo.png";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="mx-auto flex w-full h-28 min-h-28 max-h-28 flex-wrap items-center justify-around p-4 gap-5 md:gap-0 bg-[#F5F5F5]">
      <Image
        src={logo}
        alt="لوگوی کلینیک میثم"
        width={0}
        height={0}
        sizes="100vw"
        className="h-full max-h-full w-auto"
        priority
      />

      <div className="flex flex-col items-center justify-center gap-1 cursor-default select-none">
        <p className="text-xs font-light">
          © {currentYear} کلینیک دندانپزشکی میثم - تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
