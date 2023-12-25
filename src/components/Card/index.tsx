import Image from "next/image";
import Typography from "../Typography";
import Link from "next/link";
import { kindergarten } from "@/app/styles/fonts";

interface CardProps {
  type:
    | "news"
    | "news-kindergarten"
    | "course"
    | "course-kindergarten"
    | "facility"
    | "facility-kindergarten"
    | "curriculum"
    | "curriculum-kindergarten"
    | "team"
    | "team-kindergarten";

  title: string;
  img: string;
  alt: string;
  tag?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  description: string;
  lang?: "en" | "zh";
}

export default function Card(props: CardProps) {
  const {
    type,
    img,
    alt,
    title,
    tag,
    description,
    facebook,
    twitter,
    linkedin,
    lang = "en",
  } = props;
  switch (type) {
    case "news-kindergarten":
      return (
        <div className="relative min-h-fit min-w-fit">
          <Image
            src={img}
            alt={alt}
            width="254"
            height="350"
            className="w-[160px] h-[220px] md:w-[254px] md:h-[350px] rounded-lg"
          ></Image>
          <div className="absolute bottom-[18px] h-[100px] left-0 bg-deepBlue/[0.8] pl-[12px] pr-[4px] py-[8px] flex flex-col items-start">
            <Typography varient="h4" color="white text-start">
              {title}
            </Typography>
            <Typography varient="body" color="white text-start">
              {description}
            </Typography>
          </div>
        </div>
      );
    case "news":
      return (
        <div className="relative min-h-fit min-w-fit">
          <Image
            src={img}
            alt={alt}
            width="254"
            height="350"
            className="w-[160px] h-[220px] md:w-[254px] md:h-[350px]"
          ></Image>
          <div className="absolute bottom-[18px] h-[100px] left-0 bg-deepBlue/[0.8] pl-[12px] pr-[4px] py-[8px] flex flex-col items-start">
            <Typography
              varient="h4"
              color="white"
              className={`${lang === "en" ? "font-serif" : ""} text-start`}
            >
              {title}
            </Typography>
            <Typography
              varient="body"
              color="white"
              className={`${lang === "en" ? "font-serif" : ""} text-start`}
            >
              {description}
            </Typography>
          </div>
        </div>
      );
    case "course-kindergarten":
      return (
        <div className="flex flex-col w-[400px] items-center">
          <Image
            src={img}
            alt={alt}
            width="200"
            height="200"
            className="w-[200px] h-[200px] rounded-[200px] object-cover"
          ></Image>
          <div className="flex flex-col items-center p-[16px]">
            <Typography
              varient="h3"
              className={`mb-[12px] ${
                lang === "en" ? kindergarten.className : ""
              }`}
            >
              {title}
            </Typography>
            <Typography varient="h6" className="text-textGray text-left">
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
            <Typography varient="h6" className="text-textGray text-left">
              {description}
            </Typography>
          </div>
        </div>
      );
    case "facility-kindergarten":
      return (
        <div className="flex flex-col w-full md:w-[400px]">
          <Image
            src={img}
            alt={alt}
            width="400"
            height="270"
            className="w-full md:w-[400px] h-auto rounded-xl"
          ></Image>
          <div className="flex flex-col items-start py-[16px]">
            <Typography
              varient="h4"
              className={`text-textGray mb-[2px] ${
                lang === "en" ? kindergarten.className : ""
              }`}
            >
              {title}
            </Typography>
            <Typography varient="h5" className="text-textGray text-start">
              {description}
            </Typography>
          </div>
        </div>
      );
    case "facility":
      return (
        <div className="flex flex-col w-full md:w-[400px]">
          <Image
            src={img}
            alt={alt}
            width="400"
            height="270"
            className="w-full md:w-[400px] h-auto"
          ></Image>
          <div className="flex flex-col items-start py-[16px]">
            <Typography
              varient="h4"
              className={`text-textGray mb-[2px] ${
                lang === "en" ? "font-serif" : ""
              }`}
            >
              {title}
            </Typography>
            <Typography varient="h5" className="text-textGray text-start">
              {description}
            </Typography>
          </div>
        </div>
      );
    case "curriculum-kindergarten":
      return (
        <div className="flex flex-col w-full md:w-[254px]">
          <Image
            src={img}
            alt={alt}
            width="254"
            height="351"
            className="w-full md:w-[254px] h-auto rounded-2xl"
          ></Image>
          <div className="flex flex-col items-start py-[16px]">
            <Typography
              varient="h4"
              className={`text-textGray mb-1 ${
                lang === "en" ? kindergarten.className : ""
              } text-start`}
            >
              {title}
            </Typography>
            <Typography varient="h5" className="text-textGray text-start">
              {description}
            </Typography>
          </div>
        </div>
      );
    case "curriculum":
      return (
        <div className="flex flex-col w-full md:w-[254px]">
          <Image
            src={img}
            alt={alt}
            width="254"
            height="351"
            className="w-full md:w-[254px] h-auto"
          ></Image>
          <div className="flex flex-col items-start py-[16px]">
            <Typography
              varient="h4"
              className={`text-textGray mb-[2px] ${
                lang === "en" ? "font-serif" : ""
              } text-start`}
            >
              {title}
            </Typography>
            <Typography varient="h5" className="text-textGray text-start">
              {description}
            </Typography>
          </div>
        </div>
      );
    case "team-kindergarten":
      return (
        <div className="flex flex-col items-center justify-center w-full md:w-[322px]">
          <Image
            src={img}
            alt={alt}
            width="322"
            height="310"
            className="w-full md:w-[230px] h:auto rounded-[161px]"
          ></Image>
          <div className="flex flex-col items-center py-[16px] px-[16px]">
            <Typography
              varient="h3"
              className={`${
                lang === "en" ? kindergarten.className : ""
              } mb-[12px]`}
            >
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
            <div className="flex flex-row flex-1 justify-center my-4 gap-x-6">
              {facebook && (
                <Link href={facebook}>
                  <Image
                    src="/icons/FacebookDeepBlue.svg"
                    alt="hankel Instagram"
                    width="24"
                    height="24"
                  ></Image>
                </Link>
              )}
              {twitter && (
                <Link href={twitter}>
                  <Image
                    src="/icons/TwitterDeepBlue.svg"
                    alt="hankel Facebook"
                    width="24"
                    height="24"
                  ></Image>
                </Link>
              )}
              {linkedin && (
                <Link href={linkedin}>
                  <Image
                    src="/icons/LinkedInDeepBlue.svg"
                    alt="hankel Youtube"
                    width="24"
                    height="24"
                  ></Image>
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    case "team":
      return (
        <div className="flex flex-col w-full md:w-[322px] rounded-xl shadow-md">
          <Image
            src={img}
            alt={alt}
            width="322"
            height="310"
            className="w-full md:w-[322px] h:auto"
          ></Image>
          <div className="flex flex-col items-center py-[16px] px-[16px]">
            <Typography
              varient="h3"
              className={`${lang === "en" ? "font-serif" : ""} mb-[12px]`}
            >
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
            <div className="flex flex-row flex-1 justify-center my-4 gap-x-6">
              {facebook && facebook.length > 0 && (
                <Link href={facebook}>
                  <Image
                    src="/icons/FacebookDeepBlue.svg"
                    alt="hankel Instagram"
                    width="24"
                    height="24"
                  ></Image>
                </Link>
              )}
              {twitter && twitter.length > 0 && (
                <Link href={twitter}>
                  <Image
                    src="/icons/TwitterDeepBlue.svg"
                    alt="hankel Facebook"
                    width="24"
                    height="24"
                    className="mr-[24px]"
                  ></Image>
                </Link>
              )}
              {linkedin && linkedin.length > 0 && (
                <Link href={linkedin}>
                  <Image
                    src="/icons/LinkedInDeepBlue.svg"
                    alt="hankel Youtube"
                    width="24"
                    height="24"
                  ></Image>
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    default:
      break;
  }
}
