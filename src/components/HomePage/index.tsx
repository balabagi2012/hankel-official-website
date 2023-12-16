import Banner from "../Banner";
import ContactForm from "../ContactForm";
import ContactInfo from "../ContactInfo";
import LatestNews from "../LatestNews";
import { Program } from "../Program";
import Section from "../Section";
const getHome = async (lang: "en" | "zh") => {
  const res = await fetch(`${process.env.API_URI}/api/home/?lang=${lang}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const getContact = async (name: string, lang: "en" | "zh") => {
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

const getHomeData = async (name: string, lang: "en" | "zh") => {
  const home = await getHome(lang);
  const contact = await getContact(name, lang);
  return {
    ...home,
    contact,
  };
};
interface HomePageProps {
  lang: "en" | "zh";
  name: string;
}

export default async function HomePage(props: HomePageProps) {
  const { lang, name } = props;
  const data = await getHomeData(name, lang);
  return (
    <main>
      <Banner
        size="big"
        src={data.banner}
        title={data.title[lang]}
        subtitle={data.subtitle[lang]}
        description={data.description[lang]}
      ></Banner>
      <Program
        lang={lang}
        title={data.programTitle[lang]}
        programs={data.programs}
      />
      <Banner
        size="medium"
        src={data.subBanner.img}
        title={data.subBanner.title[lang]}
        description={data.subBanner.description[lang]}
      ></Banner>
      <LatestNews />
      <Section>
        <div className="flex flex-col md:flex-row w-full md:w-[1024px] items-stretch">
          <ContactInfo lang={lang} type="subschool" contact={data.contact} />
          <ContactForm lang={lang} />
        </div>
      </Section>
    </main>
  );
}
