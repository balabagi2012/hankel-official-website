import { title } from "process";
import Banner from "../Banner";
import Card from "../Card";
import Section from "../Section";
import Title from "../Title";
import Typography from "../Typography";
import { TeamEntity } from "@/app/api/team/route";

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
      <Banner size="small" src={team.banner}></Banner>
      <Section className="bg-bgGray">
        <div className="flex flex-col w-full md:w-[1068px]">
          <Title full align="center" type={type}>
            {team.foreignTeam.title[lang]}
          </Title>
          <Typography varient="h5" className="text-textGray text-center">
            {team.foreignTeam.description[lang]}
          </Typography>
          <div className="flex flex-col md:flex-row justify-between items-center gap-y-4 mt-8">
            {team.foreignTeam.teachers.map((element, index) => (
              <Card
                key={`foreign team ${index}`}
                type="team"
                img={element.img}
                alt={element.title[lang]}
                title={element.title[lang]}
                tag={element.tag[lang]}
                description={element.description[lang]}
                facebook={element.facebook}
                linkedin={element.linkedin}
                twitter={element.twitter}
              ></Card>
            ))}
          </div>
        </div>
      </Section>
      <Section className="bg-white">
        <div className="flex flex-col w-full md:w-[1068px]">
          <Title full align="center" type={type}>
            {team.localTeam.title[lang]}
          </Title>
          <Typography varient="h5" className="text-textGray text-center">
            {team.localTeam.description[lang]}
          </Typography>
          <div className="flex flex-col md:flex-row justify-between items-center gap-y-4 mt-8">
            {team.localTeam.teachers.map((element, index) => (
              <Card
                key={`local team ${index}`}
                type="team"
                img={element.img}
                alt={element.title[lang]}
                title={element.title[lang]}
                tag={element.tag[lang]}
                description={element.description[lang]}
                facebook={element.facebook}
                linkedin={element.linkedin}
                twitter={element.twitter}
              ></Card>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
