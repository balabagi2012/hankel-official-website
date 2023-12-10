import { kindergarten } from "@/app/styles/fonts";
import Typography from "../Typography";

interface TitleProps {
  children: string;
  full?: boolean;
  align?: "left" | "center";
  className?: string;
  type?: string;
}

export default function Title(props: TitleProps) {
  const {
    children,
    full = false,
    align = "center",
    className = "",
    type = "",
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
        className={`font-serif text-deepBlue ${
          align === "center" ? "text-center" : "text-left"
        } ${
          type === "kindergarten" ? kindergarten.className : ""
        } ${className}`}
      >
        {children}
      </Typography>
    </div>
  );
}
