import Banner from "@/components/Banner";
import Card from "@/components/Card";
import Section from "@/components/Section";
import Title from "@/components/Title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel - News",
};

const title = "News";
const description = `About more news in Hankel`;

export default function News() {
  return (
    <main className="pt-[50px] md:pt-[80px]">
      <Banner
        size="large"
        src="/banners/news.png"
        title={title}
        description={description}
      ></Banner>
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
        <div className="flex flex-col p-4 md:p-0">
          <div className="flex flex-row">
            <Title full align="left">
              News
            </Title>
          </div>
          <div className="flex flex-row flex-wrap mb-2 md:mb-[52px] gap-2 md:gap-4">
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
          <div className="flex flex-row flex-wrap mb-2 md:mb-[52px] gap-2 md:gap-4">
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
      </Section>
    </main>
  );
}
