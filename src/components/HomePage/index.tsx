import dynamic from "next/dynamic";
import ContactForm from "../ContactForm";
import ContactInfo from "../ContactInfo";
import Footer from "../Footer";
import LatestNews from "../LatestNews";
import { Program } from "../Program";
import Section from "../Section";
import Head from "next/head";
import { getContact, getHome } from "@/utils/api";
import SeoHeading from "../SeoHeading";

const Banner = dynamic(() => import("../Banner"), { ssr: false });

const getHomeData = async (name: string) => {
  const home = await getHome();
  const contact = await getContact(name);
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
  const data = await getHomeData(name);
  return (
    <main>
      <Head>
        <link rel="alternate" href="/zh" hrefLang="x-default" />
        <link rel="alternate" href="/en" hrefLang="en-US" />
        <link rel="alternate" href="/zh" hrefLang="zh-TW" />
        <link rel="canonical" href={`/${lang}`} />
      </Head>
      <Banner
        size="big"
        src={data.banners[0]}
        title={data.title[lang]}
        subtitle={data.subtitle[lang]}
        description={data.description[lang]}
        banners={data.banners}
        lang={lang}
      ></Banner>
      <SeoHeading {...data} lang={lang} />
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
        lang={lang}
      ></Banner>
      <LatestNews lang={lang} name={name} />
      <Section>
        <div className="flex flex-col md:flex-row w-full md:w-[1024px] items-stretch">
          <ContactInfo lang={lang} type="subschool" contact={data.contact} />
          <ContactForm lang={lang} name={name} mail={data.contact.email} />
        </div>
      </Section>
      <Footer lang={lang} name={name} />
    </main>
  );
}
