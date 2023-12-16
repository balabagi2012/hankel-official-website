import Image from "next/image";
import Title from "../Title";
import Typography from "../Typography";
import { ContactEntity } from "@/app/api/contact/route";
import Link from "next/link";

export interface ContactInfoProps {
  type?: "subschool" | "home" | "kindergarten";
  contact: ContactEntity;
}
export default function ContactInfo(props: ContactInfoProps) {
  const { type = "subschool", contact } = props;
  return (
    <div className="flex p-4 md:p-0 flex-1 flex-col items-start justify-around">
      <Title full align="left" type={type}>
        {contact.title}
      </Title>
      <Typography
        varient="h5"
        className="text-start flex-1 md:mt-[-40px]"
        color="textGray"
      >
        {contact.description}
      </Typography>
      <div className="flex flex-row items-center flex-1 mt-4 md:mt-0">
        <Image
          src="/icons/PhoneOutlined.svg"
          alt="hankel PhoneOutlined"
          width="24"
          height="24"
          className="mr-3"
        ></Image>
        <Typography varient="h5" className="text-start">
          {contact.phone}
        </Typography>
      </div>
      <div className="flex flex-row items-center flex-1 mt-3 md:mt-0">
        <Image
          src="/icons/MailOutlined.svg"
          alt="hankel MailOutlined"
          width="24"
          height="24"
          className="mr-3"
        ></Image>
        <Typography varient="h5" className="text-start">
          {contact.email}
        </Typography>
      </div>
      <div className="flex flex-row items-start flex-1 mt-3 md:mt-0">
        <Image
          src="/icons/LocationOnOutlined.svg"
          alt="hankel LocationOnOutlined"
          width="24"
          height="24"
          className="mr-3 mt-2"
        ></Image>
        <Typography varient="h5" className="text-start flex-wrap">
          {contact.address}
        </Typography>
      </div>
      <div className="flex flex-row flex-1 mt-4 md:mt-0 gap-x-6">
        {contact.instagram && (
          <Link href={contact.instagram} rel="noopener noreferrer">
            <Image
              src="/icons/InstagramBlue.svg"
              alt="hankel Instagram"
              width="24"
              height="24"
            ></Image>
          </Link>
        )}
        {contact.facebook && (
          <Link href={contact.facebook} rel="noopener noreferrer">
            <Image
              src="/icons/FacebookBlue.svg"
              alt="hankel Facebook"
              width="24"
              height="24"
            ></Image>
          </Link>
        )}
        {contact.youtube && (
          <Link href={contact.youtube} rel="noopener noreferrer">
            <Image
              src="/icons/YoutubeBlue.svg"
              alt="hankel Youtube"
              width="24"
              height="24"
            ></Image>
          </Link>
        )}
        {contact.line && (
          <Link href={contact.line} rel="noopener noreferrer">
            <Image
              src="/icons/LineBlue.svg"
              alt="hankel line"
              width="24"
              height="24"
            ></Image>
          </Link>
        )}
      </div>
    </div>
  );
}
