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

interface SubschoolProps {
  name: "dayCare" | "elementary" | "kindergarten" | "middleSchool";
  lang: "en" | "zh";
  banner?: string;
  type?: "subSchool" | "kindergarten";
}

const getContact = async (
  name: string,
  lang: string
): Promise<ContactEntity> => {
  const res = await fetch(
    `${process.env.API_URI}/api/contact/${name}?lang=${lang}`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const getSubschoolData = async (name: string, lang: "en" | "zh") => {
  const contact = await getContact(name, lang);
  return {
    contact,
  };
};

export default async function Subschool(props: SubschoolProps) {
  const {
    name,
    lang,
    banner = "/banners/school.png",
    type = "subSchool",
  } = props;
  const sectionTexts = [
    `Hankel Education cultivates students' curiosity, creativity, and
      academic excellence with the spirit of seeking truth, fostering
      virtue, and pursuing aesthetics. Through our distinctive teaching
      approach of "Multilingualism," "Scientific Research," and
      "Activities," we shape well-rounded individuals, preparing them for
      a future of unlimited possibilities.`,
    `"Thriving Growth" embodies our commitment to nurturing the
      potential of every student. Through innovative methods, we
      encourage them to explore, challenge themselves, and build
      confidence. `,
    `"Pursuit of Excellence" represents our dedication to
      outstanding education. We inspire students to embrace
      challenges, cultivate resilience, and foster a passion for
      learning through innovative methods.`,
    `The value of "Learning" underscores our emphasis on knowledge
      and creativity. We encourage curiosity, critical thinking, and
      problem-solving skills, providing students with superior and
      innovative skills necessary for their future. `,
  ];
  const data = await getSubschoolData(name, lang);

  return (
    <main className="pt-[50px] md:pt-[200px]">
      <Banner size="small" src={banner} />
      <Section className="bg-gray">
        <Title align="center" type={type}>
          The Hankel Experience
        </Title>
        <div className="w-full md:w-[1024px] flex-col items-center">
          <Typography varient="h5" className="mb-[80px]">
            {sectionTexts[0]}
          </Typography>
          <div className="flex flex-col items-center md:flex-row gap-4">
            {[1, 2, 3].map((element) => (
              <Card
                key={`course ${element}`}
                type="course"
                img={`/course/${element}.png`}
                alt={`hankel news ${element}`}
                title="Coding in class"
                description={sectionTexts[element]}
              ></Card>
            ))}
          </div>
        </div>
      </Section>
      <Banner
        size="medium"
        src="/subBanners/teach.png"
        title="“Education is not the filling of a pail, but the lighting of a
              fire.”"
        description="------ William Butler Yeats
              "
      ></Banner>
      <LatestNews className="bg-white" />
      <Section className="bg-gray">
        <Title align="center" type={type}>
          Social Media Post
        </Title>
        <div className="flex flex-col md:flex-row mb-[52px] gap-4">
          <div className="flex flex-col">
            <Typography
              varient="h2"
              className={`font-serif text-deepBlue mb-5 ${
                type === "kindergarten" ? kindergarten.className : ""
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
                type === "kindergarten" ? kindergarten.className : ""
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
          <ContactInfo type="kindergarten" contact={data.contact} />
          <ContactForm lang={lang} />
        </div>
      </Section>
    </main>
  );
}
