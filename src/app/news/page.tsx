import { Metadata } from "next";
import styles from "./page.module.css";
import Banner from "@/components/Banner";
import Typography from "@/components/Typography";
import Image from "next/image";
import Title from "@/components/Title";
import Card from "@/components/Card";

export const metadata: Metadata = {
  title: "Hankel - News",
};

const title = "News";
const description = `About more news in Hankel`;

export default function News() {
  return (
    <main className="pt-[80px]">
      <Banner
        size="large"
        src="/banners/news.png"
        title={title}
        description={description}
      ></Banner>
      <section className="flex flex-row bg-gray">
        <div className="flex flex-col mx-[55px] gap-4 bg-white rounded-xl p-4 h-fit mt-[160px]">
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
        </div>
        <div className="flex flex-col mt-[60px]">
          <div className="flex flex-row">
            <Title full align="left">
              News
            </Title>
          </div>
          <div className="flex flex-row mb-[52px] gap-4">
            {[1, 2, 3, 4].map((element) => (
              <Card
                key={`news ${element}`}
                type="news"
                img={`/news/${element}.png`}
                alt={`hankel news ${element}`}
                title="Coding in class"
                description="Programming classes in camp"
              ></Card>
            ))}
          </div>
          <div className="flex flex-row mb-[52px] gap-4">
            {[5, 6, 7, 8].map((element) => (
              <Card
                key={`news ${element}`}
                type="news"
                img={`/news/${element}.png`}
                alt={`hankel news ${element}`}
                title="Coding in class"
                description="Programming classes in camp"
              ></Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
