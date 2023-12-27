import Section from "@/components/Section";
import Title from "@/components/Title";
import Typography from "@/components/Typography";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hankel - News",
};

const fetchPageData = async (id: string) => {
  const url = `${process.env.API_URI}/api/news/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export default async function NewsDetail({
  params: { id, lang },
}: {
  params: { id: string; lang: "en" | "zh" };
}) {
  const news = await fetchPageData(id);
  return (
    <main className={`pt-[50px] bg-bgGray md:pt-[80px]`}>
      <Section className="bg-bgGray pt-2 md:pt-8">
        <Link
          href={`/${lang}/news`}
          className="flex flex-row justify-start items-center mr-auto"
        >
          <Image
            src={`/icons/ChevronRightFilledBlue.svg`}
            width={24}
            height={24}
            alt={"back arrow"}
            className="mr-2"
          ></Image>
          <Typography varient="h5" className="text-blue">
            Back to news
          </Typography>
        </Link>
        <div className="w-full flex flex-1 flex-col items-start">
          <Title align="left" full>
            {news.title[lang]}
          </Title>
          <div className="mt-[-24px] mb-8 px-3 py-4 flex flex-row bg-gray-200 w-full rounded-md">
            <Image
              src={`/icons/ScheduleOutlined.svg`}
              width={24}
              height={24}
              alt={"back arrow"}
              className="mr-2"
            ></Image>
            <Typography varient="h5" className="">
              {`Last updated: ${new Date(news.updatedAt).toLocaleDateString()}`}
            </Typography>
          </div>
          <Image
            src={news.banner}
            width={240}
            height={240}
            alt={"news banner"}
            className="w-auto h-content h-max-80 mb-8"
          ></Image>
          <div
            className="flex-1 flex flex-col items-start justify-start w-full"
            dangerouslySetInnerHTML={{ __html: news.content[lang] }}
          ></div>
        </div>
      </Section>
    </main>
  );
}
