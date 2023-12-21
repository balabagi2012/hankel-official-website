import { ContactEntity } from "@/app/api/contact/route";
import Image from "next/image";
import Link from "next/link";
import Banner from "../Banner";
import ContactForm from "../ContactForm";
import Section from "../Section";
import Title from "../Title";
import Typography from "../Typography";

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
      ></Banner>
      <Section className="bg-bgGray">
        <div className="flex flex-col w-full md:w-[700px]">
          <Title full align="center" type={type}>
            {data.title[lang]}
          </Title>
          <Typography varient="h5" className="text-textGray text-center">
            {data.description[lang]}
          </Typography>
          <div className="flex flex-row my-[40px] justify-center gap-x-6">
            {data.instagram && data.instagram.length > 0 && (
              <Link href={data.instagram} rel="noopener noreferrer">
                <Image
                  src="/icons/InstagramBlue.svg"
                  alt="hankel Instagram"
                  width="24"
                  height="24"
                ></Image>
              </Link>
            )}
            {data.facebook && data.facebook.length > 0 && (
              <Link href={data.facebook} rel="noopener noreferrer">
                <Image
                  src="/icons/FacebookBlue.svg"
                  alt="hankel Facebook"
                  width="24"
                  height="24"
                ></Image>
              </Link>
            )}
            {data.youtube && data.youtube.length > 0 && (
              <Link href={data.youtube} rel="noopener noreferrer">
                <Image
                  src="/icons/YoutubeBlue.svg"
                  alt="hankel Youtube"
                  width="24"
                  height="24"
                ></Image>
              </Link>
            )}
            {data.line && data.line.length > 0 && (
              <Link href={data.line} rel="noopener noreferrer">
                <Image
                  src="/icons/LineBlue.svg"
                  alt="hankel line"
                  width="24"
                  height="24"
                ></Image>
              </Link>
            )}
          </div>
          <div className="bg-white flex flex-col shadow-2xl px-9 py-[18px]">
            <div className="flex flex-row items-center flex-1 mb-6">
              <Image
                src="/icons/PhoneOutlined.svg"
                alt="hankel PhoneOutlined"
                width="24"
                height="24"
                className="mr-3"
              ></Image>
              <Typography varient="h5" className="text-start">
                {data.phone}
              </Typography>
            </div>
            <div className="flex flex-row items-center flex-1 mb-6">
              <Image
                src="/icons/MailOutlined.svg"
                alt="hankel MailOutlined"
                width="24"
                height="24"
                className="mr-3"
              ></Image>
              <Typography varient="h5" className="text-start">
                {data.email}
              </Typography>
            </div>
            <div className="flex flex-row items-start flex-1">
              <Image
                src="/icons/LocationOnOutlined.svg"
                alt="hankel LocationOnOutlined"
                width="24"
                height="24"
                className="mr-3 mt-2"
              ></Image>
              <Typography varient="h5" className="text-start flex-wrap">
                {data.address[lang]}
              </Typography>
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <div className="flex flex-col w-full md:w-[700px]">
          <ContactForm name={name} lang={lang} />
        </div>
      </Section>
    </main>
  );
}
