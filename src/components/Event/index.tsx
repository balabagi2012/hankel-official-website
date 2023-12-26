"use client";
import { EventEntity } from "@/app/api/event/route";
import Image from "next/image";
import { PrimeReactProvider } from "primereact/api";
import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import Typography from "../Typography";

export interface EventProps {
  category: string;
  lang: "en" | "zh";
}
export default function Event(props: EventProps) {
  const { category, lang } = props;
  const [date, setDate] = useState<Date>();
  const [eventList, setEventList] = useState<EventEntity[]>([]);

  useEffect(() => {
    setDate(new Date());
  }, [lang]);

  useEffect(() => {
    if (date && category) {
      const fetchEventList = async () => {
        const url = `/api/event?date=${new Date(date)
          .toLocaleDateString()
          .replaceAll("/", "-")}&category=${category}`;
        const res = await fetch(url, {
          cache: "no-cache",
        });
        if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error("Failed to fetch data");
        }
        return res.json();
      };
      fetchEventList().then((data) => {
        setEventList(data);
      });
    }
  }, [date, category]);

  return (
    <PrimeReactProvider>
      <div className="w-full flex flex-col-reverse md:flex-row gap-y-4">
        <div className="flex flex-1">
          {eventList.length == 0 && (
            <Typography varient="h5">
              {lang === "en"
                ? "Sorry, there is no event today."
                : "抱歉，今天沒有活動。"}
            </Typography>
          )}
          {eventList.map((event) => (
            <div key={event._id}>
              <div
                className="flex-1 flex flex-col items-start justify-start w-full mb-4"
                dangerouslySetInnerHTML={{ __html: event.content[lang] }}
              ></div>
              {event?.banner?.length > 0 && (
                <Image
                  src={event.banner}
                  width={300}
                  height={300}
                  alt={event.title[lang]}
                ></Image>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-start items-start p-4 rounded border">
          <Calendar
            value={date}
            onChange={(e) => setDate(e.value as Date)}
            inline
            showWeek
          />
        </div>
      </div>
    </PrimeReactProvider>
  );
}
