import Image from "next/image";
import Card from "../Card";
import Title from "../Title";
import Typography from "../Typography";
import Section from "../Section";
import { kindergarten } from "@/app/styles/fonts";
import Link from "next/link";

export interface LatestNewsProps {
  className?: string;
  name: string;
  lang: "en" | "zh";
}
export default function LatestNews({
  lang,
  name,
  className = "",
}: LatestNewsProps) {
  return (
    <Section className={`bg-bgGray ${className}`}>
      <Title type={name}>{lang === "en" ? "Latest News" : "最新消息"}</Title>
      <div className="w-full flex flex-row overflow-x-scroll mb-[52px] gap-4">
        {[1, 2, 3, 4, 5].map((element) => (
          <Card
            key={`news ${element}`}
            type={`news${name === "kindergarten" ? `-kindergarten` : ""}`}
            img={`/news/${element}.png`}
            alt={`hankel news ${element}`}
            title="Coding in class"
            description="Programming classes in camp"
          ></Card>
        ))}
      </div>
      <Link
        href={`/${lang}/news`}
        className="px-[32px] py-[8px] border rounded border-blue w-fit flex flex-row justify-center items-center"
      >
        <Typography varient="h6" className="font-bold text-blue">
          {lang === "en" ? "View More" : "查看更多"}
        </Typography>
        <Image
          src="/icons/ChevronRightFilled.svg"
          alt="hankel ChevronRightFilled"
          width="24"
          height="24"
          className="ml-[10px]"
        ></Image>
      </Link>
    </Section>
  );
}
