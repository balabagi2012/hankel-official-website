import { getTeam } from "@/utils/api";
import { chunk } from "lodash";
import dynamic from "next/dynamic";
import Head from "next/head";
import Card from "../Card";
import Footer from "../Footer";
import Section from "../Section";
import Title from "../Title";
import Typography from "../Typography";

const Banner = dynamic(() => import("../Banner"), { ssr: false });

export interface TeamProps {
  type?: "kindergarten" | "subschool";
  name: string;
  lang: "en" | "zh";
}

export default async function Team(props: TeamProps) {
  const { type = "subschool", name, lang } = props;
  const team = await getTeam(name);
  return (
    <main className="pt-[50px] md:pt-[200px]">
      <Head>
        <link rel="alternate" href={`/zh/${name}/team`} hrefLang="x-default" />
        <link rel="alternate" href={`/en/${name}/team`} hrefLang="en-US" />
        <link rel="alternate" href={`/zh/${name}/team`} hrefLang="zh-TW" />
        <link rel="canonical" href={`/${lang}/${name}/team`} />
      </Head>
      <Banner size="small" src={team.banner} lang={lang}></Banner>
      {team.foreignTeam.teachers?.length >= 1 && (
        <Section className="bg-bgGray">
          <div className="flex flex-col w-full md:w-[1068px]">
            <Title full align="center" type={type} lang={lang}>
              {team.foreignTeam.title[lang]}
            </Title>
            <Typography
              varient="h5"
              className="text-textGray text-left whitespace-pre-line"
            >
              {team.foreignTeam.description[lang]}
            </Typography>
            {chunk(team.foreignTeam.teachers, 3).map((chunk, chunkIndex) => (
              <div
                key={`foreignTeam chunk ${chunkIndex}`}
                className="flex flex-col md:flex-row justify-start items-start gap-8 gap-y-4 mt-8"
              >
                {chunk.map((element, index) => (
                  <Card
                    key={`foreignTeam ${index}`}
                    type={`team${
                      name === "kindergarten" ? `-kindergarten` : ""
                    }`}
                    img={element.img}
                    alt={element.title[lang]}
                    title={element.title[lang]}
                    tag={element.tag[lang]}
                    description={element.description[lang]}
                    facebook={element.facebook}
                    linkedin={element.linkedin}
                    twitter={element.twitter}
                    lang={lang}
                  ></Card>
                ))}
              </div>
            ))}
          </div>
        </Section>
      )}
      <Section className="bg-white">
        <div className="flex flex-col w-full md:w-[1068px]">
          <Title full align="center" type={type} lang={lang}>
            {team.localTeam.title[lang]}
          </Title>
          <Typography
            varient="h5"
            className="text-textGray text-left whitespace-pre-line"
          >
            {team.localTeam.description[lang]}
          </Typography>
          {chunk(team.localTeam.teachers, 3).map((chunk, chunkIndex) => (
            <div
              key={`local team chunk ${chunkIndex}`}
              className="flex flex-col md:flex-row justify-start items-start gap-8 mt-8"
            >
              {chunk.map((element, index) => (
                <Card
                  key={`local team ${index}`}
                  type={`team${name === "kindergarten" ? `-kindergarten` : ""}`}
                  img={element.img}
                  alt={element.title[lang]}
                  title={element.title[lang]}
                  tag={element.tag[lang]}
                  description={element.description[lang]}
                  facebook={element.facebook}
                  linkedin={element.linkedin}
                  twitter={element.twitter}
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
