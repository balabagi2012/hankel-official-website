import { NewsEntity } from "@/app/api/news/route";
import { chunk } from "lodash";
import dynamic from "next/dynamic";
import Card from "../Card";
import Section from "../Section";
import Title from "../Title";

const Banner = dynamic(() => import("../Banner"), { ssr: false });

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

export interface NewsProps {
  name: string;
  lang: "en" | "zh";
}

export default async function News({ name, lang }: NewsProps) {
  const news = await fetchLatestNews(name);
  return (
    <main className="pt-[50px] md:pt-[80px]">
      <Banner size="large" src="/banners/news.png" lang={lang}></Banner>
      <Section className="bg-bgGray">
        {/* <div className="hidden md:flex flex-col mx-[55px] gap-4 bg-white rounded-xl p-4 h-fit mt-[40px] md:mt-[160px]">
          <div>
            <Typography varient="h4">Important News</Typography>
          </div>
          <div>
            <Typography varient="h4" className="font-thin">
              Latest News
            </Typography>
          </div>
          <div>
            <Typography varient="h4" className="font-thin">
              Events
            </Typography>
          </div>
        </div> */}
        <div className="flex flex-col w-full p-4 md:p-0  md:w-[740px] lg:w-[1000px] xl:w-[1150px]">
          <div className="flex flex-row">
            <Title full align="left" lang={lang}>
              News
            </Title>
          </div>
          {chunk(news, 4).map((chunk, chunkIndex) => (
            <div
              key={`news-chunk-${chunkIndex}`}
              className="flex flex-row flex-wrap mb-2 md:mb-[52px] gap-1 md:gap-8"
            >
              {chunk.map((news) => {
                const element = news as NewsEntity;
                return (
                  <div
                    key={`news-chunk-${chunkIndex}-${element._id}`}
                    className="flex basis-[48%] md:basis-1/4 flex-row justify-center items-start"
                  >
                    <Card
                      id={element._id}
                      type="news"
                      img={element.banner}
                      alt={`hankel news ${element._id}`}
                      title={element.title[lang]}
                      category={element.category}
                      description={element.description[lang]}
                      lang={lang}
                    ></Card>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
