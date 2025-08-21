'use client';
import './index.css';

import dayjs from 'dayjs';
import Image from 'next/image';
import { PrimeReactProvider } from 'primereact/api';
// import { Calendar } from "primereact/calendar";
import { Tooltip } from 'primereact/tooltip';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

import { EventEntity } from '@/app/api/event/route';

import Typography from '../Typography';
export interface EventProps {
  category: string;
  lang: 'en' | 'zh';
  calendar: {
    text: {
      en: string;
      zh: string;
    };
    img: string;
    file: string;
  };
}
export default function Event(props: EventProps) {
  const { category, lang, calendar } = props;
  const [date, setDate] = useState<Date>();
  const [eventList, setEventList] = useState<EventEntity[]>([]);

  useEffect(() => {
    setDate(new Date());
  }, []);

  useEffect(() => {
    if (date && category) {
      const fetchEventList = async () => {
        const url = `/api/event?date=${new Date(date)
          .toLocaleDateString()
          .replaceAll('/', '-')}&category=${category}`;
        const res = await fetch(url, {
          cache: 'no-cache',
        });
        if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data');
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
        <div className="flex flex-1 flex-col items-start justify-start w-full">
          <Typography varient="h5" className="mb-4">
            {calendar.text[lang]}
          </Typography>
          <Image
            src={calendar.img}
            width={804}
            height={475}
            alt={calendar.img}
          ></Image>
        </div>
        <div className="flex flex-col justify-start items-start p-4">
          <Calendar
            value={date}
            navigationLabel={({ date, label, locale, view }) => (
              <Typography
                varient="h3"
                className="text-blue absolute left-2 top-1"
              >
                {dayjs(date).format('YYYY.MM')}
              </Typography>
            )}
            nextLabel={
              <Image
                width={15}
                height={15}
                alt="next"
                src="/icons/ChevronRight.svg"
                className="absolute right-4 top-4"
                onClick={() => {
                  setDate(dayjs(date).add(1, 'month').toDate());
                }}
              ></Image>
            }
            next2Label={null}
            prevLabel={
              <Image
                width={15}
                height={15}
                alt="next"
                src="/icons/ChevronLeft.svg"
                className="absolute right-10 top-4"
                onClick={() => {
                  setDate(dayjs(date).subtract(1, 'month').toDate());
                }}
              ></Image>
            }
            prev2Label={null}
            // showNavigation={false}
            showNeighboringCentury={false}
            showNeighboringDecade={false}
            showNeighboringMonth={false}
            view="month"
            locale={'en-US'}
            className={`w-full md:w-[330px] rounded border-none shadow-lg relative pt-8`}
            tileClassName={`w-10 h-10`}
            tileContent={({ date }) => {
              const event = eventList.find((event) =>
                dayjs(event.date).isSame(dayjs(date), 'day')
              );
              return event ? (
                <div className="relative w-full h-full">
                  <div
                    className={`d${dayjs(event.date).format(
                      'YYYYMMDD'
                    )} absolute w-full h-full bg-blue right-0 top-[-20px] bottom-0`}
                  >
                    <div className="text-white mt-1">{date.getDate()}</div>
                    <Tooltip
                      className="py-2"
                      target={`.d${dayjs(event.date).format('YYYYMMDD')}`}
                      position="bottom"
                      content={event.title[lang]}
                    />
                  </div>
                </div>
              ) : null;
            }}
          />
          <a
            href={calendar.file}
            download={calendar.file}
            className="border-2 text-blue font-bold border-blue rounded w-full mt-8 py-3 flex flex-row justify-center items-center"
          >
            {lang === 'en' ? 'Download Calendar' : '下載行事曆'}
          </a>
        </div>
      </div>
    </PrimeReactProvider>
  );
}
