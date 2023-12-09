"use client";

import Image from "next/image";
import Link from "next/link";
import Typography from "../Typography";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { kindergarten, notoSans } from "@/app/styles/fonts";

export default function Header() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [isSubHeader, setIsSubHeader] = useState(false);
  const [language, setLanguage] = useState("english");
  const [subSchool, setSubSchool] = useState("");

  const [openLanguageDropDown, setOpenLanguageDropDown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const subSchool = [
        "dayCare",
        "elementary",
        "kindergarten",
        "middleSchool",
      ].find((subSchool) => pathname.indexOf(subSchool) >= 0);
      if (subSchool) {
        setIsSubHeader(true);
        setSubSchool(subSchool);
      } else {
        setIsSubHeader(false);
        setSubSchool("");
      }
    }
  }, [pathname]);

  return (
    <header
      className={`fixed start-0 w-full ${
        isSubHeader ? `h-[200px]` : `h-[80px]`
      } ${
        isSubHeader ? `pt-[25px] pb-[22px]` : ``
      } px-[80px] flex flex-row items-center bg-white z-10`}
    >
      <Link
        href="/"
        rel="noopener noreferrer"
        className="flex items-center mr-auto"
      >
        <Image
          src="/logo.svg"
          alt="hankel logo"
          width="200"
          height="42"
        ></Image>
      </Link>
      <div
        className={`flex flex-col items-center flex-1 ${
          isSubHeader ? "h-full" : ""
        }`}
      >
        {isSubHeader ? (
          <div className="flex flex-col h-full">
            <div className="flex flex-col w-fit min-w-[400px] mx-auto">
              <p
                className={`self-star ${
                  subSchool === "kindergarten"
                    ? notoSans.className
                    : "font-serif"
                } text-[18px] text-deepBlue leading-none tracking-[1px]`}
              >
                Small steps towards a
              </p>
              <p
                className={`self-end ${
                  subSchool === "kindergarten"
                    ? kindergarten.className
                    : "font-serif"
                } ${
                  subSchool === "kindergarten" ? "mt-2" : ""
                } text-[40px] text-deepBlue mr-4 leading-none tracking-[1px]`}
              >
                BIG FUTURE
              </p>
              <p
                className={`${
                  subSchool === "kindergarten" ? "self-end" : "self-center"
                } text-[10px] leading-normal ${
                  subSchool === "kindergarten" ? "mt-4" : "mt-2"
                } tracking-[1px]`}
              >
                {subSchool !== "kindergarten"
                  ? "Welcome to Hankel International Academy for Primary Education"
                  : "Welcome to Hankel International Kindergarten"}
              </p>
            </div>
            <div className="flex flex-row items-end mt-auto gap-x-[16px]">
              <Link href={`/${subSchool}`} rel="noopener noreferrer">
                <Typography
                  varient="h6"
                  className={`${
                    pathname === `/${subSchool}`
                      ? `font-bold text-blue ${
                          subSchool === "kindergarten"
                            ? kindergarten.className
                            : notoSans.className
                        }`
                      : "text-deepBlue"
                  }`}
                >
                  {`Hankel ${
                    subSchool.charAt(0).toUpperCase() + subSchool.slice(1)
                  }`}
                </Typography>
              </Link>
              <Link href={`/${subSchool}/curriculum`} rel="noopener noreferrer">
                <Typography
                  varient="h6"
                  className={`${
                    pathname === `/${subSchool}/curriculum`
                      ? `font-bold text-blue ${
                          subSchool === "kindergarten"
                            ? kindergarten.className
                            : notoSans.className
                        }`
                      : "text-deepBlue"
                  }`}
                >
                  Our Curriculum
                </Typography>
              </Link>
              <Link href={`/${subSchool}/facilities`} rel="noopener noreferrer">
                <Typography
                  varient="h6"
                  className={`${
                    pathname === `/${subSchool}/facilities`
                      ? `font-bold text-blue ${
                          subSchool === "kindergarten"
                            ? kindergarten.className
                            : notoSans.className
                        }`
                      : "text-deepBlue"
                  }`}
                >
                  Our Facilities
                </Typography>
              </Link>
              <Link href={`/${subSchool}/team`} rel="noopener noreferrer">
                <Typography
                  varient="h6"
                  className={`${
                    pathname === `/${subSchool}/team`
                      ? `font-bold text-blue ${
                          subSchool === "kindergarten"
                            ? kindergarten.className
                            : notoSans.className
                        }`
                      : "text-deepBlue"
                  }`}
                >
                  Our Team
                </Typography>
              </Link>
              <Link href={`/${subSchool}/about`} rel="noopener noreferrer">
                <Typography
                  varient="h6"
                  className={`${
                    pathname === `/${subSchool}/about`
                      ? `font-bold text-blue ${
                          subSchool === "kindergarten"
                            ? kindergarten.className
                            : notoSans.className
                        }`
                      : "text-deepBlue"
                  }`}
                >
                  About
                </Typography>
              </Link>
              <Link
                href={`/${subSchool}/information`}
                rel="noopener noreferrer"
              >
                <Typography
                  varient="h6"
                  className={`${
                    pathname === `/${subSchool}/information`
                      ? `font-bold text-blue ${
                          subSchool === "kindergarten"
                            ? kindergarten.className
                            : notoSans.className
                        }`
                      : "text-deepBlue"
                  }`}
                >
                  Information
                </Typography>
              </Link>
              <Link href={`/${subSchool}/contact`} rel="noopener noreferrer">
                <Typography
                  varient="h6"
                  className={`${
                    pathname === `/${subSchool}/contact`
                      ? `font-bold text-blue ${
                          subSchool === "kindergarten"
                            ? kindergarten.className
                            : notoSans.className
                        }`
                      : "text-deepBlue"
                  }`}
                >
                  Contact
                </Typography>
              </Link>
              <Link href={`/${subSchool}/portal`} rel="noopener noreferrer">
                <Typography
                  varient="h6"
                  className={`${
                    pathname === `/${subSchool}/portal`
                      ? `font-bold text-blue ${
                          subSchool === "kindergarten"
                            ? kindergarten.className
                            : notoSans.className
                        }`
                      : "text-deepBlue"
                  }`}
                >
                  Portal
                </Typography>
              </Link>
            </div>
          </div>
        ) : (
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
            <div
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
                  openDropDown ? "block" : "hidden"
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
                      className={`${
                        pathname === "/dayCare" ? "font-bold" : ""
                      }`}
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
                      className={`${
                        pathname === "/elementary" ? "font-bold" : ""
                      }`}
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
            </div>
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
            <Link
              href="https://google.com"
              className="text-base"
              rel="noreferrer"
            >
              <Typography varient="h6">Student Portal</Typography>
            </Link>
          </div>
        )}
      </div>
      <div
        className={`ml-[80px] flex flex-row items-center ${
          isSubHeader ? `self-start` : "self-center"
        }`}
        onClick={() => setOpenLanguageDropDown(!openLanguageDropDown)}
      >
        <Image
          src="/icons/LanguageOutlined.svg"
          alt="hankel language"
          width="24"
          height="24"
        ></Image>
        <div className="ml-1 mr-2 font-bold">
          {language === "english" ? "EN" : "ZH"}
        </div>
        <Image
          src="/icons/ChevronBottomFilled.svg"
          alt="hankel chevron bottom"
          width="24"
          height="24"
        ></Image>
        <div
          className={`${
            openLanguageDropDown ? "block" : "hidden"
          } absolute top-20 z-10  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-button"
          tabIndex={-1}
          id="language-dropdown"
        >
          <div className="p-4" role="none">
            <div
              onClick={() => setLanguage("english")}
              className={`mb-4 h-[25px] flex flex-row justify-start`}
              rel="noopener noreferrer"
            >
              <Typography
                varient="h6"
                className={`${language === "english" ? "font-bold" : ""}`}
              >
                English
              </Typography>
            </div>
            <div
              onClick={() => setLanguage("中文")}
              className={`h-[25px] flex flex-row justify-start`}
              rel="noopener noreferrer"
            >
              <Typography
                varient="h6"
                className={`${language === "中文" ? "font-bold" : ""}`}
              >
                中文
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
