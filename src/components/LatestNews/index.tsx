import { NewsEntity } from "@/app/api/news/route";
import Image from "next/image";
import Link from "next/link";
import Card from "../Card";
import Section from "../Section";
import Title from "../Title";
import Typography from "../Typography";

export interface LatestNewsProps {
  className?: string;
  name: string;
  lang: "en" | "zh";
}

const fetchLatestNews = async (name: string) => {
  const url = `${process.env.API_URI}/api/news?limit=16${
    name === "home" ? "" : `&category=${name}`
  }`;
  const res = await fetch(url, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export default async function LatestNews({
  lang,
  name,
  className = "",
}: LatestNewsProps) {
  const news = await fetchLatestNews(name);
  return (
    <Section className={`bg-bgGray ${className}`}>
      <Title type={name} lang={lang}>
        {lang === "en" ? "Latest News" : "最新消息"}
      </Title>
      <div className="w-full flex flex-row overflow-x-scroll mb-[52px] gap-4">
        {news.map((element: NewsEntity) => (
          <Card
            name={name}
            key={`news ${element._id}`}
            type={`news${name === "kindergarten" ? `-kindergarten` : ""}`}
            img={element.banner}
            id={element._id}
            alt={`hankel news banner`}
            title={element.title[lang]}
            category={element.category}
            description={element.description[lang]}
            lang={lang}
          ></Card>
        ))}
      </div>
      {name === "home" ? (
        <></>
      ) : (
        <Link
          href={`/${lang}/${name}/news`}
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
      )}
    </Section>
  );
}
