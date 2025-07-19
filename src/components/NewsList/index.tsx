"use client";
import { NewsEntity } from "@/app/api/news/route";
import { Paginator } from "primereact/paginator";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import { useState } from "react";
import Card from "../Card";

export interface NewsListProps {
  news: NewsEntity[];
  lang: "en" | "zh";
}
export default function NewsList({ news, lang }: NewsListProps) {
  const [pagination, setPagination] = useState({ first: 0, rows: 8, page: 0 });

  const onPageChange = (event: { first: number; rows: number }) => {
    setPagination({ ...pagination, ...event });
  };
  return (
    <>
      <div className="w-full flex flex-row flex-wrap mb-2 md:mb-[52px] gap-y-1 md:gap-y-8">
        {news
          .slice(pagination.first, pagination.first + pagination.rows)
          .map((element: NewsEntity) => {
            return (
              <div
                key={`news-${element._id}`}
                className="flex basis-[48%] md:basis-1/4 lg:basis-1/4 flex-row justify-center items-start"
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
      <Paginator
        first={pagination.first}
        rows={8}
        totalRecords={news.length}
        onPageChange={onPageChange}
      />
    </>
  );
}
