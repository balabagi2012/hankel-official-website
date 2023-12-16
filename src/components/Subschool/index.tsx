import { kindergarten } from "@/app/styles/fonts";
import Image from "next/image";
import Banner from "../Banner";
import Card from "../Card";
import ContactForm from "../ContactForm";
import ContactInfo from "../ContactInfo";
import Title from "../Title";
import Typography from "../Typography";
import LatestNews from "../LatestNews";
import Section from "../Section";
import { ContactEntity } from "@/app/api/contact/route";
import { SubschoolEntity } from "@/app/api/subschool/route";

interface SubschoolProps {
  name: "dayCare" | "elementary" | "kindergarten" | "middleSchool";
  lang: "en" | "zh";
}

const getSubschool = async (name: string): Promise<SubschoolEntity> => {
  const res = await fetch(`${process.env.API_URI}/api/subschool/${name}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
const getContact = async (name: string): Promise<ContactEntity> => {
  const res = await fetch(`${process.env.API_URI}/api/contact/${name}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const getSubschoolData = async (name: string, lang: "en" | "zh") => {
  const subschool = await getSubschool(name);
  const contact = await getContact(name);
  return {
    ...subschool,
    contact,
  };
};

export default async function Subschool(props: SubschoolProps) {
  const { name, lang } = props;

  const data = await getSubschoolData(name, lang);

  return (
    <main className="pt-[50px] md:pt-[200px]">
      <Banner size="small" src={data.banner} />
      <Section className="bg-gray">
        <Title align="center" type={name}>
          {data.title[lang]}
        </Title>
        <div className="w-full md:w-[1024px] flex-col items-center">
          <Typography varient="h5" className="mb-[80px]">
            {data.description[lang]}
          </Typography>
          <div className="flex flex-col items-start md:flex-row gap-4">
            {data.experiences.map((element, index) => (
              <Card
                key={`experience ${index}`}
                type="course"
                img={element.img}
                alt={element.title[lang]}
                title={element.title[lang]}
                description={element.description[lang]}
              ></Card>
            ))}
          </div>
        </div>
      </Section>
      <Banner
        size="medium"
        src={data.subBanner.img}
        title={data.subBanner.title[lang]}
        description={data.subBanner.description[lang]}
      ></Banner>
      <LatestNews className="bg-white" />
      <Section className="bg-gray">
        <Title align="center" type={name}>
          {lang === "en" ? "Social Media Post" : "社群媒體"}
        </Title>
        <div className="flex flex-col md:flex-row mb-[52px] gap-4">
          <div className="flex flex-col">
            <Typography
              varient="h2"
              className={`font-serif text-deepBlue mb-5 ${
                name === "kindergarten" ? kindergarten.className : ""
              }`}
            >
              Instagram
            </Typography>
            <div className="flex flex-col gap-y-5">
              <div className="flex flex-row flex-1 flex-wrap gap-5 justify-between">
                <Image
                  src="/instagram/1.png"
                  alt="hankel Instagram"
                  width="200"
                  height="200"
                  className="w-[160px] h-[160px] md:w-[200px] md:h-[200px]"
                ></Image>
                <Image
                  src="/instagram/2.png"
                  alt="hankel Facebook"
                  width="200"
                  height="200"
                  className="w-[160px] h-[160px] md:w-[200px] md:h-[200px]"
                ></Image>
                <Image
                  src="/instagram/3.png"
                  alt="hankel Youtube"
                  width="200"
                  height="200"
                  className="w-[160px] h-[160px] md:w-[200px] md:h-[200px]"
                ></Image>
                <Image
                  src="/instagram/4.png"
                  alt="hankel Line"
                  width="200"
                  height="200"
                  className="w-[160px] h-[160px] md:w-[200px] md:h-[200px]"
                ></Image>
              </div>
              <div className="flex flex-row flex-1 flex-wrap gap-5 justify-between">
                <Image
                  src="/instagram/5.png"
                  alt="hankel Instagram"
                  width="200"
                  height="200"
                  className="w-[160px] h-[160px] md:w-[200px] md:h-[200px]"
                ></Image>
                <Image
                  src="/instagram/6.png"
                  alt="hankel Facebook"
                  width="200"
                  height="200"
                  className="w-[160px] h-[160px] md:w-[200px] md:h-[200px]"
                ></Image>
                <Image
                  src="/instagram/7.png"
                  alt="hankel Youtube"
                  width="200"
                  height="200"
                  className="w-[160px] h-[160px] md:w-[200px] md:h-[200px]"
                ></Image>
                <Image
                  src="/instagram/8.png"
                  alt="hankel Line"
                  width="200"
                  height="200"
                  className="w-[160px] h-[160px] md:w-[200px] md:h-[200px]"
                ></Image>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Typography
              varient="h2"
              className={`font-serif text-deepBlue mb-5 ${
                name === "kindergarten" ? kindergarten.className : ""
              }`}
            >
              Facebook
            </Typography>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FHIAPE.LK&tabs=timeline&width=280&height=420&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1540608879363126"
              width="280"
              height="420"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
        </div>
      </Section>
      <Section>
        <div className="flex flex-col md:flex-row w-full lg:w-[1024px] items-stretch">
          <ContactInfo
            lang={lang}
            type={name === "kindergarten" ? "kindergarten" : "subschool"}
            contact={data.contact}
          />
          <ContactForm lang={lang} />
        </div>
      </Section>
    </main>
  );
}
