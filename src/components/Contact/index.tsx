import { ContactEntity } from "@/app/api/contact/route";
import Image from "next/image";
import Link from "next/link";
import Banner from "../Banner";
import ContactForm from "../ContactForm";
import Section from "../Section";
import Title from "../Title";
import Typography from "../Typography";
import ContactInfo from "../ContactInfo";
import Footer from "../Footer";

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
          <ContactForm name={name} lang={lang} />
        </div>
      </Section>
      <Footer lang={lang} name={name} />
    </main>
  );
}
