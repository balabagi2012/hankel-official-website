import Image from "next/image";
import { ReactElement } from "react";

interface BannerProps {
  className?: string;
  size?: "big" | "medium" | "small";
  src: string;
  title?: string;
  subtitle?: string;
  description?: string;
}
export default function Banner({
  className,
  title,
  description,
  src,
  subtitle,
  size = "big",
}: BannerProps) {
  return (
    <div
      className={`w-full ${
        size === "big"
          ? "h-screen"
          : size === "medium"
          ? "h-[400px]"
          : "h-[350px]"
      } relative ${className} pt-[80px] flex flex-row justify-center items-center`}
    >
      <Image
        alt="banner home"
        src={src}
        className="z-[-1] absolute"
        quality={100}
        fill
        objectFit="fill"
      ></Image>
      {size === "big" ? (
        <div className="z-[-1] absolute w-[530px] pt-[20px] pb-[32px] px-[16px] bg-[rgba(255,255,255,.8)] flex flex-col justify-center items-center">
          <Image
            alt="Mountains"
            src="/logo_square.svg"
            quality={100}
            width={60}
            height={60}
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
      ) : (
        size === "medium" && (
          <div className="z-[-1] absolute w-full px-[80px] flex flex-col justify-center items-start flex-1">
            <div className="text-white my-2 font-bold font-serif leading-[1.5] tracking-[1px] text-[52px]">
              {title}
            </div>
            <div className="text-[18px] font-serif font-bold text-white leading-[2] tracking-[1px]">
              {description}
            </div>
          </div>
        )
      )}
    </div>
  );
}
