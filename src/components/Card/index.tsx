import Image from "next/image";
import Typography from "../Typography";

interface CardProps {
  type: "news" | "course";
  title: string;
  img: string;
  alt: string;
  description: string;
}

export default function Card(props: CardProps) {
  const { type, img, alt, title, description } = props;
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
    default:
      break;
  }
}
