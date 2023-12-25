import { kindergarten } from "@/app/styles/fonts";
import Typography from "../Typography";

interface TitleProps {
  children: string;
  full?: boolean;
  align?: "left" | "center";
  className?: string;
  type?: string;
  lang?: "en" | "zh";
}

export default function Title(props: TitleProps) {
  const {
    children,
    full = false,
    align = "center",
    className = "",
    type = "",
    lang = "en",
  } = props;
  return (
    <div
      className={`mb-10 md:mb-[60px] border-b ${full ? "w-full" : "w-fit"} ${
        type === "kindergarten"
          ? "border-dashed border-orange"
          : "border-solid border-deepBlue"
      }`}
    >
      <Typography
        varient="h1"
        className={`text-deepBlue ${
          align === "center" ? "text-center" : "text-left"
        } ${
          type === "kindergarten"
            ? kindergarten.className
            : lang === "en"
            ? "font-serif"
            : ""
        } ${className}`}
      >
        {children}
      </Typography>
    </div>
  );
}
