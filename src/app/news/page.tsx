import { Metadata } from "next";
import styles from "./page.module.css";
import Banner from "@/components/Banner";
import Typography from "@/components/Typography";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hankel - News",
};

const title = "News";
const description = `About more news in Hankel`;

export default function News() {
  return (
    <main>
      <Banner
        size="medium"
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
            <Typography varient="h4" className="font-thin">Latest News</Typography>
          </div>
          <div>
            <Typography varient="h4" className="font-thin">Events</Typography>
          </div>
        </div>
        <div className="flex flex-col mt-[60px]">
          <div className="flex flex-row">
            <div className="mb-9 border-b border-deepBlue w-full">
              <Typography
                varient="h1"
                className="font-serif text-deepBlue text-start"
              >
                News
              </Typography>
            </div>
          </div>
          <div className="flex flex-row mb-[52px] gap-4">
            {[1, 2, 3, 4].map((element) => (
              <div className="relative" key={`news ${element}`}>
                <Image
                  src={`/news/${element}.png`}
                  alt={`hankel news ${element}`}
                  width="254"
                  height="350"
                ></Image>
                <div className="absolute bottom-[18px] h-[100px] left-0 bg-deepBlue/[0.8] pl-[12px] pr-[4px] py-[8px] flex flex-col items-start">
                  <Typography varient="h4" color="white font-serif text-start">
                    Coding in class
                  </Typography>
                  <Typography
                    varient="body"
                    color="white font-serif text-start"
                  >
                    Programming classes in camp
                  </Typography>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row mb-[52px] gap-4">
            {[5, 6, 7, 8].map((element) => (
              <div className="relative" key={`news ${element}`}>
                <Image
                  src={`/news/${element}.png`}
                  alt={`hankel news ${element}`}
                  width="254"
                  height="350"
                ></Image>
                <div className="absolute bottom-[18px] h-[100px] left-0 bg-deepBlue/[0.8] pl-[12px] pr-[4px] py-[8px] flex flex-col items-start">
                  <Typography varient="h4" color="white font-serif text-start">
                    Coding in class
                  </Typography>
                  <Typography
                    varient="body"
                    color="white font-serif text-start"
                  >
                    Programming classes in camp
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
