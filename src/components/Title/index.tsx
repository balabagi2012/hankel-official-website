import Typography from "../Typography";

interface TitleProps {
  children: string;
  full?: boolean;
  align?: "left" | "center";
  className?: string;
}

export default function Title(props: TitleProps) {
  const { children, full = false, align = "center", className = "" } = props;
  return (
    <div
      className={`mb-[60px] border-b border-deepBlue ${
        full ? "w-full" : "w-fit"
      }`}
    >
      <Typography
        varient="h1"
        className={`font-serif text-deepBlue ${
          align === "center" ? "text-center" : "text-left"
        } ${className}`}
      >
        {children}
      </Typography>
    </div>
  );
}
