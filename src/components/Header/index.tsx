"use client";

import Image from "next/image";
import Link from "next/link";
import Typography from "../Typography";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed start-0 w-full h-[80px] px-[80px] flex flex-row items-center bg-white z-10">
      <div className="flex items-center mr-auto flex-1">
        <Image
          src="/logo.svg"
          alt="hankel logo"
          width="200"
          height="42"
        ></Image>
      </div>
      <div className="flex flex-row  items-center gap-x-[56px]">
        <Link
          href="/"
          className={`py-1 ${pathname === "/" ? "border-b-2" : ""}`}
          rel="noopener noreferrer"
        >
          <Typography
            varient="h6"
            className={`${pathname === "/" ? "font-bold" : ""}`}
          >
            Home
          </Typography>
        </Link>
        <button
          className="flex flex-row items-center relative"
          onClick={() => setOpenDropDown(!openDropDown)}
        >
          <Typography varient="h6">Schools</Typography>
          <Image
            src="/icons/ChevronTopFilled.svg"
            alt="hankel chevron bottom"
            width="24"
            height="24"
            className={`${openDropDown ? "rotate-00" : "rotate-180"} ml-1`}
          ></Image>
          <div
            className={`${
              openDropDown ? "hidden" : "block"
            } absolute top-10 z-10  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="schools-button"
            tabIndex={-1}
            id="dropdown"
          >
            <div className="p-4" role="none">
              <Link
                href="/dayCare"
                className={`mb-4 h-[25px] flex flex-row justify-start`}
                rel="noopener noreferrer"
              >
                <Typography
                  varient="h6"
                  className={`${pathname === "/dayCare" ? "font-bold" : ""}`}
                >
                  dayCare
                </Typography>
              </Link>
              <Link
                href="/elementary"
                className={`mb-4 h-[25px] flex flex-row justify-start`}
                rel="noopener noreferrer"
              >
                <Typography
                  varient="h6"
                  className={`${pathname === "/elementary" ? "font-bold" : ""}`}
                >
                  elementary
                </Typography>
              </Link>
              <Link
                href="/kindergarten"
                className={`mb-4 h-[25px] flex flex-row justify-start`}
                rel="noopener noreferrer"
              >
                <Typography
                  varient="h6"
                  className={`${
                    pathname === "/kindergarten" ? "font-bold" : ""
                  }`}
                >
                  kindergarten
                </Typography>
              </Link>
              <Link
                href="/middleSchool"
                className={`h-[25px] flex flex-row justify-start`}
                rel="noopener noreferrer"
              >
                <Typography
                  varient="h6"
                  className={`${
                    pathname === "/middleSchool" ? "font-bold" : ""
                  }`}
                >
                  middleSchool
                </Typography>
              </Link>
            </div>
          </div>
        </button>
        <Link
          href="/about"
          className={`py-1 ${pathname === "/about" ? "border-b-2" : ""}`}
          rel="noopener noreferrer"
        >
          <Typography
            varient="h6"
            className={`${pathname === "/about" ? "font-bold" : ""}`}
          >
            About
          </Typography>
        </Link>
        <Link
          href="/news"
          className={`py-1 ${pathname === "/news" ? "border-b-2" : ""}`}
          rel="noopener noreferrer"
        >
          <Typography
            varient="h6"
            className={`${pathname === "/news" ? "font-bold" : ""}`}
          >
            News
          </Typography>
        </Link>
        <Link
          href="/contact"
          className={`py-1 ${pathname === "/contact" ? "border-b-2" : ""}`}
          rel="noopener noreferrer"
        >
          <Typography
            varient="h6"
            className={`${pathname === "/contact" ? "font-bold" : ""}`}
          >
            Contact
          </Typography>
        </Link>
        <Link href="https://google.com" className="text-base" rel="noreferrer">
          <Typography varient="h6">Student Portal</Typography>
        </Link>
      </div>
      <div className="ml-[80px] flex flex-row items-center">
        <Image
          src="/icons/LanguageOutlined.svg"
          alt="hankel language"
          width="24"
          height="24"
        ></Image>
        <div className="ml-1 mr-2 font-bold">EN</div>
        <Image
          src="/icons/ChevronTopFilled.svg"
          alt="hankel chevron right"
          width="24"
          height="24"
        ></Image>
      </div>
    </header>
  );
}
