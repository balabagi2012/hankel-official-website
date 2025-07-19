import { getCurriculum } from "@/utils/api";
import { chunk } from "lodash";
import dynamic from "next/dynamic";
import Head from "next/head";
import Card from "../Card";
import Footer from "../Footer";
import Section from "../Section";
import Title from "../Title";
import Typography from "../Typography";
import SeoHeading from "../SeoHeading";

const Banner = dynamic(() => import("../Banner"), { ssr: false });

export interface CurriculumProps {
  type?: "kindergarten" | "subschool";
  lang: "en" | "zh";
  name: string;
  banner?: string;
}

export default async function Curriculum(props: CurriculumProps) {
  const { lang, name, type = "subschool" } = props;
  const curriculum = await getCurriculum(name);
  return (
    <main className="pt-[50px] md:pt-[200px]">
      <Head>
        <link
          rel="alternate"
          href={`/zh/${name}/curriculum`}
          hrefLang="x-default"
        />
        <link
          rel="alternate"
          href={`/en/${name}/curriculum`}
          hrefLang="en-US"
        />
        <link
          rel="alternate"
          href={`/zh/${name}/curriculum`}
          hrefLang="zh-TW"
        />
        <link rel="canonical" href={`/${lang}/${name}/curriculum`} />
      </Head>
      <Banner size="small" src={curriculum.banner} lang={lang}></Banner>
      <Section className="bg-bgGray">
        <SeoHeading {...curriculum} lang={lang} />
        <div className="flex flex-col w-full md:w-[700px]">
          <Title full align="center" type={type} lang={lang}>
            {curriculum.title[lang]}
          </Title>
          <Typography
            varient="h5"
            className="text-textGray text-left whitespace-pre-line"
          >
            {curriculum.description[lang]}
          </Typography>
        </div>
      </Section>
      <Section className="bg-white">
        <div className="flex flex-col w-full md:w-[768px] lg:w-[1024px] xl:w-[1280px]">
          <Title full align="left" type={type} lang={lang}>
            {curriculum.curriculumTitle[lang]}
          </Title>
          {chunk(curriculum.curriculums, 4).map((elements, chunkIndex) => (
            <div
              key={`curriculum-chunk-${chunkIndex}`}
              className="w-full flex flex-col justify-start items-center md:items-start md:flex-row md:flex-wrap md:mt-10"
            >
              {elements.map((element, index) => (
                <Card
                  key={`curriculum-chunk-${chunkIndex}-${index}`}
                  type={`curriculum${
                    name === "kindergarten" ? `-kindergarten` : ""
                  }`}
                  img={element.img}
                  alt={element.title[lang]}
                  title={element.title[lang]}
                  description={element.description[lang]}
                  lang={lang}
                ></Card>
              ))}
            </div>
          ))}
        </div>
      </Section>
      <Footer lang={lang} name={name} />
    </main>
  );
}
