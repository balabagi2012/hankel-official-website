import Image from "next/image";
import { ReactElement } from "react";
import Typography from "../Typography";

interface BannerProps {
  className?: string;
  size?: "big" | "large" | "medium" | "small";
  src: string;
  title?: string;
  subtitle?: string;
  description?: string;
  children?: ReactElement;
}
export default function Banner({
  className,
  title,
  description,
  src,
  subtitle,
  size = "big",
  children,
}: BannerProps) {
  return (
    <div
      className={`w-full ${
        size === "big"
          ? "h-screen"
          : size === "large"
          ? "h-[420px]"
          : size === "medium"
          ? "h-[400px]"
          : "h-[350px]"
      } relative flex flex-row justify-center items-center ${className ?? ""}`}
    >
      <Image
        alt="banner home"
        src={src}
        className="z-[-1] absolute w-auto h-auto"
        quality={100}
        fill
        style={{ objectFit: "fill" }}
      ></Image>
      {size === "big" && (
        <div className="z-[-1] absolute w-full h-full md:h-fit md:w-[530px] pt-[50px] md:pt-[20px] pb-[32px] px-[16px] bg-[rgba(255,255,255,.8)] flex flex-col justify-center items-center">
          <Image
            alt="Mountains"
            src="/logo_square.svg"
            quality={100}
            width={60}
            height={60}
            className="w-auto h-auto"
          ></Image>
          <div className="text-[#13325D] my-2 font-bold font-serif leading-[1.5] tracking-[1px] text-[32px]">
            {title}
          </div>
          <div className="text-[16px] font-serif leading-[2] tracking-[1px] mb-3 text-justify">
            {subtitle}
          </div>
          <div className="text-[14px] font-sans text-[#4E4E4E] leading-[1.8] text-center">
            {description}
          </div>
        </div>
      )}
      {size === "large" && (
        <div className="z-[-1] absolute w-full px-[80px] flex flex-col justify-center items-start flex-1">
          <div className="text-white my-2 font-bold font-serif leading-[1.5] tracking-[1px] text-[52px]">
            {title}
          </div>
          <div className="text-[18px] font-serif font-bold text-white leading-[2] tracking-[1px]">
            {description}
          </div>
        </div>
      )}
      {size === "large" && (
        <div className="z-[-1] absolute w-full px-[80px] flex flex-col justify-center items-start flex-1">
          <div className="text-white my-2 font-bold font-serif leading-[1.5] tracking-[1px] text-[52px]">
            {title}
          </div>
          <div className="text-[18px] font-serif font-bold text-white leading-[2] tracking-[1px]">
            {description}
          </div>
        </div>
      )}
      {size === "medium" && title && description && (
        <div className="ml-auto mr-[76px] px-[52px] py-[28px] bg-white border-b border-blue border-l-8 relative">
          <Typography varient="h4" className="font-serif text-textGray">
            {title}
          </Typography>
          <Typography
            varient="h5"
            className="font-serif text-textGray text-right mt=[12px]"
          >
            {description}
          </Typography>
          <Image
            src="/icons/Quotes.svg"
            alt="hankel quote"
            width="41"
            height="35"
            className="absolute top-[-17px] left-[-23px]"
          ></Image>
        </div>
      )}
      {children}
    </div>
  );
}
