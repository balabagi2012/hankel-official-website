interface TypographyProps {
  varient: string;
  children: string;
  color?: string;
  className?: string;
}
export default function Typography(props: TypographyProps) {
  const { varient, children, className = "", color } = props;
  let typographyClassName = "";
  switch (varient) {
    case "h1":
      typographyClassName +=
        "text-[52px] font-bold leading-[1.5] tracking-[1px]";
      break;

    case "h2":
      typographyClassName +=
        "text-[32px] font-bold leading-[1.5] tracking-[1px]";
      break;

    case "h3":
      typographyClassName +=
        "text-[24px] font-bold leading-[1.5] tracking-[1px]";
      break;

    case "h4":
      typographyClassName += "text-[18px] font-bold leading-[2] tracking-[1px]";
      break;

    case "h5":
      typographyClassName += "text-[16px] leading-[2] tracking-[1px]";
      break;

    case "h6":
      typographyClassName += "text-[14px] leading-[1.8]";
      break;

    case "body":
    default:
      typographyClassName += "text-[12px] leading-[1.5] tracking-[1px]";
      break;
  }
  return (
    <p
      className={`${typographyClassName} ${className} ${
        color ? `text-${color}` : ""
      }`}
    >
      {children}
    </p>
  );
}
