import Typography from "../Typography";

interface TitleProps {
  children: string;
  full?: boolean;
  align?: "left" | "center";
}

export default function Title(props: TitleProps) {
  const { children, full = false, align = "center" } = props;
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
        }`}
      >
        {children}
      </Typography>
    </div>
  );
}
