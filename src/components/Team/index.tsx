import Banner from "../Banner";
import Card from "../Card";
import Footer from "../Footer";
import Section from "../Section";
import Title from "../Title";
import Typography from "../Typography";
import { TeamEntity } from "@/app/api/team/route";
import { chunk } from "lodash";

export interface TeamProps {
  type?: "kindergarten" | "subschool";
  name: string;
  lang: "en" | "zh";
}

export const getTeam = async (name: string): Promise<TeamEntity> => {
  const res = await fetch(`${process.env.API_URI}/api/team/${name}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function Team(props: TeamProps) {
  const { type = "subschool", name, lang } = props;
  const team = await getTeam(name);
  return (
    <main className="pt-[50px] md:pt-[200px]">
      <Banner size="small" src={team.banner} lang={lang}></Banner>
      {team.foreignTeam.teachers?.length >= 1 && (
        <Section className="bg-bgGray">
          <div className="flex flex-col w-full md:w-[1068px]">
            <Title full align="center" type={type} lang={lang}>
              {team.foreignTeam.title[lang]}
            </Title>
            <Typography varient="h5" className="text-textGray text-left">
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
          <Typography varient="h5" className="text-textGray text-left">
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
