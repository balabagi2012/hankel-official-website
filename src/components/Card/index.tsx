import Image from "next/image";
import Typography from "../Typography";

interface CardProps {
  type: "news" | "course" | "facility" | "curriculum" | "team";
  title: string;
  img: string;
  alt: string;
  tag?: string;
  description: string;
}

export default function Card(props: CardProps) {
  const { type, img, alt, title, tag, description } = props;
  switch (type) {
    case "news":
      return (
        <div className="relative">
          <Image src={img} alt={alt} width="254" height="350"></Image>
          <div className="absolute bottom-[18px] h-[100px] left-0 bg-deepBlue/[0.8] pl-[12px] pr-[4px] py-[8px] flex flex-col items-start">
            <Typography varient="h4" color="white font-serif text-start">
              {title}
            </Typography>
            <Typography varient="body" color="white font-serif text-start">
              {description}
            </Typography>
          </div>
        </div>
      );
    case "course":
      return (
        <div className="flex flex-col rounded-xl shadow-md bg-white w-[320px]">
          <Image src={img} alt={alt} width="320" height="200"></Image>
          <div className="flex flex-col items-center p-[16px]">
            <Typography varient="h3" className="mb-[12px]">
              {title}
            </Typography>
            <Typography varient="h6" className="text-textGray text-center">
              {description}
            </Typography>
          </div>
        </div>
      );
    case "facility":
      return (
        <div className="flex flex-col w-[400px]">
          <Image src={img} alt={alt} width="400" height="270"></Image>
          <div className="flex flex-col items-start py-[16px]">
            <Typography
              varient="h4"
              className="text-textGray mb-[2px] font-serif"
            >
              {title}
            </Typography>
            <Typography varient="h5" className="text-textGray">
              {description}
            </Typography>
          </div>
        </div>
      );
    case "curriculum":
      return (
        <div className="flex flex-col w-[254px]">
          <Image src={img} alt={alt} width="254" height="351"></Image>
          <div className="flex flex-col items-start py-[16px]">
            <Typography
              varient="h4"
              className="text-textGray mb-[2px] font-serif"
            >
              {title}
            </Typography>
            <Typography varient="h5" className="text-textGray">
              {description}
            </Typography>
          </div>
        </div>
      );
    case "team":
      return (
        <div className="flex flex-col w-[322px] rounded-xl shadow-md">
          <Image src={img} alt={alt} width="322" height="310"></Image>
          <div className="flex flex-col items-center py-[16px] px-[16px]">
            <Typography varient="h3" className="font-serif mb-[12px]">
              {title}
            </Typography>
            <div className="mb-[12px] bg-deepBlue py-1 px-2 rounded-xl w-full flex flex-row justify-center items-center">
              <Typography varient="body" className="text-white">
                {tag ?? ""}
              </Typography>
            </div>
            <Typography varient="h6" className="text-textGray  text-center">
              {description}
            </Typography>
            <div className="flex flex-row flex-1 justify-center my-4">
              <Image
                src="/icons/FacebookDeepBlue.svg"
                alt="hankel Instagram"
                width="24"
                height="24"
                className="mr-[24px]"
              ></Image>
              <Image
                src="/icons/TwitterDeepBlue.svg"
                alt="hankel Facebook"
                width="24"
                height="24"
                className="mr-[24px]"
              ></Image>
              <Image
                src="/icons/LinkedInDeepBlue.svg"
                alt="hankel Youtube"
                width="24"
                height="24"
              ></Image>
            </div>
          </div>
        </div>
      );
    default:
      break;
  }
}
