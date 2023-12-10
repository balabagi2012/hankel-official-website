import Image from "next/image";
import Title from "../Title";
import Typography from "../Typography";

export interface ContactInfoProps {
  type?: "subschool" | "home" | "kindergarten";
}
export default function ContactInfo(props: ContactInfoProps) {
  const { type = "subschool" } = props;
  return (
    <div className="flex flex-1 flex-col items-start justify-around">
      <Title full align="left" type={type}>
        Contact Us
      </Title>
      <Typography
        varient="h5"
        className="text-start flex-1 mt-[-40px]"
        color="textGray"
      >
        Do you have more questions and curiosity about us? Feel free to get in
        touch! We are eagerly looking forward to hearing your feedback,
        inquiries, and suggestions.
      </Typography>
      <div className="flex flex-row items-center flex-1">
        <Image
          src="/icons/PhoneOutlined.svg"
          alt="hankel PhoneOutlined"
          width="24"
          height="24"
          className="mr-3"
        ></Image>
        <Typography varient="h5" className="text-start">
          (02) 7751-9199
        </Typography>
      </div>
      <div className="flex flex-row items-center flex-1">
        <Image
          src="/icons/MailOutlined.svg"
          alt="hankel MailOutlined"
          width="24"
          height="24"
          className="mr-3"
        ></Image>
        <Typography varient="h5" className="text-start">
          hankel@heipe.edu.tw
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
          No. 457, Section 2, Wenhua 3rd Rd, Linkou District, New Taipei City,
          244
        </Typography>
      </div>
      <div className="flex flex-row flex-1">
        <Image
          src="/icons/InstagramBlue.svg"
          alt="hankel Instagram"
          width="24"
          height="24"
          className="mr-[24px]"
        ></Image>
        <Image
          src="/icons/FacebookBlue.svg"
          alt="hankel Facebook"
          width="24"
          height="24"
          className="mr-[24px]"
        ></Image>
        <Image
          src="/icons/YoutubeBlue.svg"
          alt="hankel Youtube"
          width="24"
          height="24"
          className="mr-[24px]"
        ></Image>
        <Image
          src="/icons/Line.svg"
          alt="hankel Line"
          width="24"
          height="24"
        ></Image>
      </div>
    </div>
  );
}
