import Image from "next/image";
import Title from "../Title";
import Typography from "../Typography";

import { InformationEntity } from "@/app/api/information/route";
import Link from "next/link";
import Banner from "../Banner";
import Event from "../Event";
import Section from "../Section";
import Footer from "../Footer";

export const getInformation = async (
  name: string
): Promise<InformationEntity> => {
  const res = await fetch(`${process.env.API_URI}/api/information/${name}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

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
      <Banner size="small" src={information.banner} lang={lang}></Banner>
      <Section className="bg-bgGray">
        <div className="flex flex-col w-full md:w-[1024px]">
          <Title full align="center" type={type} lang={lang}>
            {information.admissionBrochure.title[lang]}
          </Title>
          <Typography varient="h5" className="text-textGray text-left">
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
            <Typography varient="h5" className="text-textGray text-start mb-8">
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
          <Event lang={lang} category={name} />
        </div>
      </Section>
      <Footer lang={lang} name={name} />
    </main>
  );
}
