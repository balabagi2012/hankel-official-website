"use client";

import Image from "next/image";
import Link from "next/link";
import Typography from "../Typography";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { kindergarten, notoSans } from "@/app/styles/fonts";

export default function Header() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [isSubHeader, setIsSubHeader] = useState(false);
  const [language, setLanguage] = useState("en");
  const [subSchool, setSubSchool] = useState("");

  const [openLanguageDropDown, setOpenLanguageDropDown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const otherNavItemList = [
    {
      path: `/${language}/about`,
      label: language === "zh" ? "關於我們" : `About`,
    },
    {
      path: `/${language}/contact`,
      label: language === "zh" ? "聯絡" : `Contact`,
    },
    {
      path: `/${language}/news`,
      label: language === "zh" ? "新聞" : `News`,
    },
    {
      path: `https://google.com`,
      label: language === "zh" ? "學生資訊系統" : `Student Portal`,
    },
  ];

  const subSchoolDropDownItemList = [
    {
      path: `/${language}/dayCare`,
      label: language === "zh" ? "翰科安親班" : `DayCare`,
    },
    {
      path: `/${language}/elementary`,
      label: language === "zh" ? "翰科小學" : `Elementary`,
    },
    {
      path: `/${language}/kindergarten`,
      label: language === "zh" ? "翰科幼稚園" : `Kindergarten`,
    },
    {
      path: `/${language}/middleSchool`,
      label: language === "zh" ? "翰科中學" : `MiddleSchool`,
    },
  ];

  const homepageNavItemList = [
    {
      path: `/${language}`,
      label: language === "zh" ? "首頁" : `Home`,
    },
    ...subSchoolDropDownItemList,
    ...otherNavItemList,
  ];

  const getSubSchoolZhLabel = (subSchool: string) => {
    switch (subSchool) {
      case "dayCare":
        return "翰科安親班";
      case "elementary":
        return "翰科小學";
      case "kindergarten":
        return "翰科幼稚園";
      case "middleSchool":
        return "翰科中學";
      default:
        return "";
    }
  };

  const subSchoolNavItemList = [
    {
      path: `/${language}/${subSchool}`,
      label:
        language === "zh"
          ? getSubSchoolZhLabel(subSchool)
          : `Hankel ${subSchool.charAt(0).toUpperCase() + subSchool.slice(1)}`,
    },
    {
      path: `/${language}/${subSchool}/curriculum`,
      label: language === "zh" ? "課程內容" : `Our Curriculum`,
    },
    {
      path: `/${language}/${subSchool}/facilities`,
      label: language === "zh" ? "設施概略" : `Our Facilities`,
    },
    {
      path: `/${language}/${subSchool}/team`,
      label: language === "zh" ? "團隊介紹" : `Our Team`,
    },
    {
      path: `/${language}/${subSchool}/about`,
      label: language === "zh" ? "關於我們" : `About`,
    },
    {
      path: `/${language}/${subSchool}/information`,
      label: language === "zh" ? "其他資訊" : `Information`,
    },
    {
      path: `/${language}/${subSchool}/contact`,
      label: language === "zh" ? "聯絡" : `Contact`,
    },
    {
      path: `https://google.com`,
      label: language === "zh" ? "學生資訊系統" : `Student Portal`,
    },
  ];

  useEffect(() => {
    if (pathname) {
      if (pathname.slice(1, 3) !== language) {
        setLanguage(pathname.slice(1, 3));
      }
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
  }, [pathname, router, language]);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    router.replace(`/${lang}${pathname.slice(3)}`);
  };

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
          href={`/${language}`}
          rel="noopener noreferrer"
          className="flex items-center w-[150px] h-[32px] md:w-[200px] md:[h-42px] mr-auto ml-3 md:ml-0"
        >
          <Image
            src="/icons/logo.svg"
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
                href={`/${language}`}
                className={`py-1 border-deepBlue text-blue ${
                  pathname === `/${language}` ? "border-b-2" : ""
                }`}
                rel="noopener noreferrer"
              >
                <Typography
                  varient="h6"
                  className={`text-blue ${
                    pathname === `/${language}` ? "font-bold" : ""
                  }`}
                >
                  {language === "zh" ? "首頁" : `Home`}
                </Typography>
              </Link>
              <div
                className="flex flex-row items-center relative"
                onClick={() => setOpenDropDown(!openDropDown)}
              >
                <Typography varient="h6" className="text-blue">
                  {language === "zh" ? "學校" : "Schools"}
                </Typography>
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
                    openDropDown ? "flex" : "hidden"
                  } absolute top-10 z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="schools-button"
                  tabIndex={-1}
                  id="dropdown"
                >
                  <div className="p-4" role="none">
                    {subSchoolDropDownItemList.map(({ path, label }) => (
                      <Link
                        key={label}
                        href={path}
                        className={`mb-4 h-[25px] flex flex-row justify-start`}
                        rel="noopener noreferrer"
                      >
                        <Typography
                          varient="h6"
                          className={`text-deepBlue whitespace-nowrap	${
                            pathname === path ? "font-bold" : ""
                          }`}
                        >
                          {label}
                        </Typography>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {otherNavItemList.map(({ path, label }) => (
                <Link
                  key={label}
                  href={path}
                  className={`py-1 border-deepBlue text-blue ${pathname === path ? "border-b-2" : ""}`}
                  rel="noopener noreferrer"
                >
                  <Typography
                    varient="h6"
                    className={`${pathname === path ? "font-bold" : ""}`}
                  >
                    {label}
                  </Typography>
                </Link>
              ))}
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
            {language === "en" ? "EN" : "中文"}
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
                onClick={() => handleLanguageChange("en")}
                className={`mb-4 h-[25px] flex flex-row justify-start`}
                rel="noopener noreferrer"
              >
                <Typography
                  varient="h6"
                  className={`${language === "en" ? "font-bold" : ""}`}
                >
                  English
                </Typography>
              </div>
              <div
                onClick={() => handleLanguageChange("zh")}
                className={`h-[25px] flex flex-row justify-start`}
                rel="noopener noreferrer"
              >
                <Typography
                  varient="h6"
                  className={`${language === "zh" ? "font-bold" : ""}`}
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
