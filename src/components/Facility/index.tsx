import { FacilityEntity } from "@/app/api/facility/route";
import Image from "next/image";
import Banner from "../Banner";
import Card from "../Card";
import Section from "../Section";
import Title from "../Title";
import Typography from "../Typography";

const getFacility = async (name: string): Promise<FacilityEntity> => {
  const res = await fetch(`${process.env.API_URI}/api/facility/${name}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
export interface FacilityProps {
  type?: "kindergarten" | "subschool";
  name: string;
  lang: "en" | "zh";
}

export default async function Facility(props: FacilityProps) {
  const { type = "subschool", lang, name } = props;
  const facility = await getFacility(name);
  return (
    <main className="pt-[50px] md:pt-[200px]">
      <Banner size="small" src={facility.banner} lang={lang}></Banner>
      <Section className="bg-bgGray">
        <div className="flex flex-col w-full md:w-[700px]">
          <Title full align="center" type={type} lang={lang}>
            {facility.title[lang]}
          </Title>
          <Typography varient="h5" className="text-textGray text-center">
            {facility.description[lang]}
          </Typography>
        </div>
        <div className="w-full mt-[50px]">
          <Image
            src={facility.facilityImg}
            alt="hankel Facility Image"
            width="1024"
            height="400"
            className={`w-full h-auto ${
              name === "kindergarten" ? "rounded-3xl" : ""
            }`}
          ></Image>
        </div>
      </Section>
      <Section className="bg-white">
        <div className="flex flex-col w-full lg:w-[1268px]">
          <Title full align="left" type={type} lang={lang}>
            {facility.facilityTitle[lang]}
          </Title>
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-start md:justify-between">
            {facility.facilities.map((element, index) => (
              <Card
                key={`facility ${index}`}
                type={`facility${
                  name === "kindergarten" ? `-kindergarten` : ""
                }`}
                img={element.img}
                alt={`hankel facility ${index}`}
                title={element.title[lang]}
                description={element.description[lang]}
                lang={lang}
              ></Card>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
