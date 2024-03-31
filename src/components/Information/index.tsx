import { getInformation } from "@/utils/api";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Event from "../Event";
import Footer from "../Footer";
import Section from "../Section";
import Title from "../Title";
import Typography from "../Typography";
import SeoHeading from "../SeoHeading";

const Banner = dynamic(() => import("../Banner"), { ssr: false });

export interface InformationProps {
  type?: "kindergarten" | "subschool";
  name: string;
  lang: "en" | "zh";
}

export default async function Information(props: InformationProps) {
  const { type = "subschool", lang, name } = props;
  const information = await getInformation(name);
  return (
    <main className="pt-[50px] md:pt-[200px]">
      <Head>
        <link
          rel="alternate"
          href={`/zh/${name}/information`}
          hrefLang="x-default"
        />
        <link
          rel="alternate"
          href={`/en/${name}/information`}
          hrefLang="en-US"
        />
        <link
          rel="alternate"
          href={`/zh/${name}/information`}
          hrefLang="zh-TW"
        />
        <link rel="canonical" href={`/${lang}/${name}/information`} />
      </Head>
      <Banner size="small" src={information.banner} lang={lang}></Banner>
      <Section className="bg-bgGray">
        <SeoHeading {...information} lang={lang} />
        <div className="flex flex-col w-full md:w-[1024px]">
          <Title full align="center" type={type} lang={lang}>
            {information.admissionBrochure.title[lang]}
          </Title>
          <Typography
            varient="h5"
            className="text-textGray text-left whitespace-pre-line"
          >
            {information.admissionBrochure.description[lang]}
          </Typography>
          <Link
            href={information.admissionBrochure.file}
            className="mt-[60px] py-2 flex flex-row justify-center border items-center rounded border-deepBlue bg-white"
          >
            <Typography varient="h5" className="text-deepBlue">
              {lang === "en" ? "Download" : "下載"}
            </Typography>
            <Image
              src="/icons/DownloadOutlined.svg"
              alt="hankel download"
              width="24"
              height="24"
              className="ml-[24px]"
            ></Image>
          </Link>
        </div>
      </Section>
      <Section className="bg-white">
        <div className="flex flex-col md:flex-row w-full md:w-[1268px] justify-center items-stretch">
          <div className="flex flex-col md:mr-[65px] gap-y-3 flex-1">
            <Title full align="left" type={type} lang={lang}>
              {information.informationSession.title[lang]}
            </Title>
            <Typography
              varient="h5"
              className="text-textGray text-start mb-8 whitespace-pre-line"
            >
              {information.informationSession.description[lang]}
            </Typography>
          </div>
          <Image
            src={information.informationSession.img}
            alt="hankel about 3"
            width="582"
            height="370"
            className="w-full md:w-[582px] h-auto"
          ></Image>
        </div>
      </Section>
      <Section className="bg-bgGray">
        <div className="flex flex-col w-full md:w-[1268px] justify-center items-stretch">
          <Title full align="left" type={type} lang={lang}>
            {information.lunchMenu.title[lang]}
          </Title>
          <div className="w-full">
            <Image
              src={information.lunchMenu.img}
              alt="hankel Lunch Menu"
              sizes="100vw"
              width="1268"
              height="768"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            ></Image>
          </div>
        </div>
      </Section>
      <Section className="bg-white">
        <div className="flex flex-col w-full md:w-[1268px] justify-center items-stretch">
          <Title full align="left" type={type} lang={lang}>
            {lang === "en" ? "Calendar" : "行事曆"}
          </Title>
          <Event lang={lang} category={name} calendar={information.calendar} />
        </div>
      </Section>
      <Footer lang={lang} name={name} />
    </main>
  );
}
