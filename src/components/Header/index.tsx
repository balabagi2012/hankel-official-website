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

  const homepageNavItemList = [
    {
      path: `/`,
      label: `Home`,
    },
    {
      path: `/dayCare`,
      label: `Day Care`,
    },
    {
      path: `/elementary`,
      label: `Elementary`,
    },
    {
      path: `/kindergarten`,
      label: `Kindergarten`,
    },
    {
      path: `/middleSchool`,
      label: `Middle School`,
    },
    {
      path: `/about`,
      label: `About`,
    },
    {
      path: `/contact`,
      label: `Contact`,
    },
    {
      path: `https://google.com`,
      label: `Student Portal`,
    },
  ];

  const subSchoolNavItemList = [
    {
      path: `/${subSchool}`,
      label: `Hankel ${subSchool.charAt(0).toUpperCase() + subSchool.slice(1)}`,
    },
    {
      path: `/${subSchool}/curriculum`,
      label: `Our Curriculum`,
    },
    {
      path: `/${subSchool}/facilities`,
      label: `Our Facilities`,
    },
    {
      path: `/${subSchool}/team`,
      label: `Our Team`,
    },
    {
      path: `/${subSchool}/about`,
      label: `About`,
    },
    {
      path: `/${subSchool}/information`,
      label: `Information`,
    },
    {
      path: `/${subSchool}/contact`,
      label: `Contact`,
    },
    {
      path: `https://google.com`,
      label: `Portal`,
    },
  ];

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
      setOpenDropDown(false);
    }
  }, [pathname]);

  interface SubSchoolNavItemProps {
    path: string;
    label: string;
  }

  const SubSchoolNavItem = ({ path, label }: SubSchoolNavItemProps) => (
    <Link href={path} rel="noopener noreferrer">
      <Typography
        varient="h6"
        className={`${
          pathname === path
            ? `font-bold text-blue ${
                subSchool === "kindergarten"
                  ? kindergarten.className
                  : notoSans.className
              }`
            : "text-deepBlue"
        }`}
      >
        {label}
      </Typography>
    </Link>
  );
  return (
    <header
      className={`fixed start-0 w-full h-[50px] bg-white z-10 ${
        isSubHeader ? `md:h-[200px]` : `md:h-[80px]`
      } ${isSubHeader ? `md:pt-[25px] md:pb-[22px]` : ``} `}
    >
      <div className="h-full flex flex-row items-center md:px-[80px]">
        <Link
          href="/"
          rel="noopener noreferrer"
          className="flex items-center w-[150px] h-[32px] md:w-[200px] md:[h-42px] mr-auto ml-3 md:ml-0"
        >
          <Image
            src="/logo.svg"
            alt="hankel logo"
            className="w-[150px] h-[32px] md:w-[200px] md:[h-42px]"
            width="200"
            height="42"
          ></Image>
        </Link>
        <div
          className={`hidden md:flex flex-col items-center flex-1 ${
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
                {subSchoolNavItemList.map(({ path, label }) => (
                  <SubSchoolNavItem key={label} path={path} label={label} />
                ))}
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
                  className={`w-auto h-auto ${
                    openDropDown ? "rotate-00" : "rotate-180"
                  } ml-1`}
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
                className={`py-1 ${
                  pathname === "/contact" ? "border-b-2" : ""
                }`}
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
          className={`ml-[80px] hidden md:flex flex-row items-center ${
            isSubHeader ? `self-start` : "self-center"
          }`}
          onClick={() => setOpenLanguageDropDown(!openLanguageDropDown)}
        >
          <Image
            src="/icons/LanguageOutlined.svg"
            alt="hankel language"
            width="24"
            height="24"
            className="w-auto h-auto"
          ></Image>
          <div className="ml-1 mr-2 font-bold">
            {language === "english" ? "EN" : "ZH"}
          </div>
          <Image
            src="/icons/ChevronBottomFilled.svg"
            alt="hankel chevron bottom"
            width="24"
            height="24"
            className="w-auto h-auto"
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
        <div className="flex md:hidden mr-3 relative">
          <Image
            src="/icons/MenuFilled.svg"
            alt="hankel menu"
            width="24"
            height="24"
            className="w-auto h-auto"
            onClick={() => {
              setOpenDropDown(true);
            }}
          ></Image>
          {openDropDown && (
            <div
              className={`${
                openDropDown ? "fixed" : "hidden"
              } top-0 right-0 h-screen p-5 bg-[#E4F0F1] z-10`}
            >
              <div
                className="ml-auto flex flex-row justify-center items-center p-[10px] w-11 h-11 bg-white"
                onClick={() => {
                  setOpenDropDown(!openDropDown);
                }}
              >
                <Image
                  src="/icons/CloseFilled.svg"
                  alt="hankel close"
                  width="24"
                  height="24"
                  className="w-auto h-auto"
                ></Image>
              </div>
              <div className="flex flex-col justify-center items-start">
                {(isSubHeader ? subSchoolNavItemList : homepageNavItemList).map(
                  ({ path, label }) => {
                    return (
                      <Link
                        key={label}
                        href={path}
                        className={`mt-3`}
                        rel="noopener noreferrer"
                      >
                        <Typography varient="h5">{label}</Typography>
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
