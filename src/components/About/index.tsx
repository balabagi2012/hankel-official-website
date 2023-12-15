import Image from "next/image";
import Title from "../Title";
import Typography from "../Typography";
import { kindergarten } from "@/app/styles/fonts";
import Banner from "../Banner";
import Section from "../Section";
import { AboutEntity } from "@/app/api/about/route";

export interface AboutProps {
  name: string;
  type?: "kindergarten" | "subschool" | "home";
}

async function getAbout(name: string): Promise<AboutEntity> {
  const res = await fetch(`http://localhost:3000/api/about/${name}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function About(props: AboutProps) {
  const { name, type = "subschool" } = props;
  const data = await getAbout(name);
  return (
    <main
      className={`pt-[50px] ${
        type === "home" ? "md:pt-[80px]" : "md:pt-[200px]"
      }`}
    >
      <Banner
        size={type === "home" ? "large" : "small"}
        src={data.banner ?? "/banners/school.png"}
        title={data.title}
        description={data.description}
      ></Banner>
      <Section className="bg-gray">
        <div className="flex flex-col-reverse md:flex-row w-full md:w-[1180px] justify-center items-stretch">
          <div className="flex flex-col md:mr-[65px] gap-y-3">
            {data.sections[0].imgs.map((img) => (
              <Image
                key={img}
                src={img}
                alt={img}
                width="585"
                height="369"
              ></Image>
            ))}
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <Title full align="left" type={type}>
              {data.sections[0].title ?? ""}
            </Title>
            <div className="flex flex-1 flex-col">
              {data.sections[0].texts.map((text) =>
                text.type === "subtitle" ? (
                  <Typography
                    key={text.content}
                    varient="h4"
                    className={`font-serif text-blue text-start mb-5 ${
                      type === "kindergarten" ? kindergarten.className : ""
                    }`}
                  >
                    {text.content}
                  </Typography>
                ) : (
                  <Typography
                    key={text.content}
                    varient="h5"
                    className="text-textGray text-start mb-5"
                  >
                    {text.content}
                  </Typography>
                )
              )}
            </div>
          </div>
        </div>
      </Section>
      <Section className="bg-white">
        <div className="flex flex-col md:flex-row w-full md:w-[1180px] justify-center items-stretch">
          <div className="flex flex-col md:mr-[65px] gap-y-3 flex-1">
            <Title full align="left" type={type}>
              {data.sections[1].title ?? ""}
            </Title>
            <div className="flex flex-1 flex-col">
              {data.sections[1].texts.map((text) =>
                text.type === "subtitle" ? (
                  <Typography
                    key={text.content}
                    varient="h4"
                    className={`font-serif text-blue text-start mb-5 ${
                      type === "kindergarten" ? kindergarten.className : ""
                    }`}
                  >
                    {text.content}
                  </Typography>
                ) : (
                  <Typography
                    key={text.content}
                    varient="h5"
                    className="text-textGray text-start mb-5"
                  >
                    {text.content}
                  </Typography>
                )
              )}
            </div>
          </div>
          {data.sections[1].imgs.map((img) => (
            <Image
              key={img}
              src={img}
              alt={img}
              width="667"
              height="429"
            ></Image>
          ))}
        </div>
      </Section>
    </main>
  );
}
