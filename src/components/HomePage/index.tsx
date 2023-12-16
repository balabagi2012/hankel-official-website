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
  // contact: {
  //   title: "Contact Us",
  //   description:
  //     "Do you have more questions and curiosity about us? Feel free to get in touch! We are eagerly looking forward to hearing your feedback, inquiries, and suggestions.",
  //   facebook: `https://www.facebook.com/HankelInternationalAcademy`,
  //   instagram: `https://www.instagram.com/hankelinternationalacademy/`,
  //   youtube: `https://www.youtube.com/channel/UC9Z3Z4Z6Z5Z3Z4Z6Z5Z3Z4Z6`,
  //   line: `https://line.me/R/ti/p/%40hankel`,
  //   phone: `(02) 7751-9199`,
  //   email: `hankel@heipe.edu.tw`,
  //   address: `No. 457, Section 2, Wenhua 3rd Rd, Linkou District, New Taipei City, 244`,
  // },
};

interface HomePageProps {
  lang: "en" | "zh";
}

export default async function HomePage(props: HomePageProps) {
  const { lang } = props;
  const data = await getHome(lang);
  return (
    <main>
      <Banner
        size="big"
        src={data.banner}
        title={data.title}
        subtitle={data.subtitle}
        description={data.description}
      ></Banner>
      <Program lang={lang} title={data.programTitle} programs={data.programs} />
      <Banner
        size="medium"
        src={data.subBanner.img}
        title={data.subBanner.title}
        description={data.subBanner.description}
      ></Banner>
      <LatestNews />
      <Section>
        <div className="flex flex-col md:flex-row w-full md:w-[1024px] items-stretch">
          {/* TODO: contact data */}
          <ContactInfo />
          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
