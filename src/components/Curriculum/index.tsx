import { CurriculumEntity } from "@/app/api/curriculum/route";
import Banner from "../Banner";
import Card from "../Card";
import Section from "../Section";
import Title from "../Title";
import Typography from "../Typography";

export interface CurriculumProps {
  type?: "kindergarten" | "subschool";
  lang: "en" | "zh";
  name: string;
  banner?: string;
}

const getCurriculum = async (name: string): Promise<CurriculumEntity> => {
  console.log(`${process.env.API_URI}/api/curriculum/${name}`)
  const res = await fetch(`${process.env.API_URI}/api/curriculum/${name}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
export default async function Curriculum(props: CurriculumProps) {
  const { lang, name, type = "subschool" } = props;
  const curriculum = await getCurriculum(name);
  return (
    <main className="pt-[50px] md:pt-[200px]">
      <Banner size="small" src={curriculum.banner}></Banner>
      <Section className="bg-bgGray">
        <div className="flex flex-col w-full md:w-[700px]">
          <Title full align="center" type={type}>
            {curriculum.title[lang]}
          </Title>
          <Typography varient="h5" className="text-textGray text-center">
            {curriculum.description[lang]}
          </Typography>
        </div>
      </Section>
      <Section className="bg-white">
        <div className="flex flex-col w-full md:w-[1268px]">
          <Title full align="left" type={type}>
            {curriculum.curriculumTitle[lang]}
          </Title>
          <div className="flex flex-col md:flex-row justify-between md:flex-wrap md:gap-y-10 items-center">
            {curriculum.curriculums.map((element, index) => (
              <Card
                key={`curriculum-${index}`}
                type="curriculum"
                img={element.img}
                alt={element.title[lang]}
                title={element.title[lang]}
                description={element.description[lang]}
              ></Card>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
