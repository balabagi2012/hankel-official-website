import { ContactEntity } from "@/app/api/contact/route";
import dynamic from "next/dynamic";
import ContactForm from "../ContactForm";
import ContactInfo from "../ContactInfo";
import Footer from "../Footer";
import Section from "../Section";
import Head from "next/head";

const Banner = dynamic(() => import("../Banner"), { ssr: false });

export interface ContactProps {
  type?: "kindergarten" | "subschool" | "home";
  name: string;
  title?: string;
  lang: "en" | "zh";
  description?: string;
  banner?: string;
}

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

export default async function Contact(props: ContactProps) {
  const { lang, name, type = "subschool" } = props;
  const data = await getContact(name);
  return (
    <main
      className={`pt-[50px] ${
        type === "home" ? "md:pt-[80px]" : "md:pt-[200px]"
      }`}
    >
      <Head>
        <link
          rel="alternate"
          href={type === "home" ? "/zh/contact" : `/zh/${name}/contact`}
          hrefLang="x-default"
        />
        <link
          rel="alternate"
          href={type === "home" ? "/en/contact" : `/en/${name}/contact`}
          hrefLang="en-US"
        />
        <link
          rel="alternate"
          href={type === "home" ? "/zh/contact" : `/zh/${name}/contact`}
          hrefLang="zh-TW"
        />
      </Head>
      <Banner
        size={type === "home" ? "large" : "small"}
        src={data.banner.img ?? "/banners/contact.png"}
        title={data.banner.title?.[lang]}
        description={data.banner?.description?.[lang]}
        lang={lang}
      ></Banner>
      <Section className="bg-bgGray">
        <div className="flex flex-col w-full md:w-[700px]">
          <ContactInfo type={type} lang={lang} contact={data} />
        </div>
      </Section>
      <Section>
        <div className="flex flex-col w-full md:w-[700px]">
          <ContactForm name={name} lang={lang} mail={data.email} />
        </div>
      </Section>
      <Footer lang={lang} name={name} />
    </main>
  );
}
