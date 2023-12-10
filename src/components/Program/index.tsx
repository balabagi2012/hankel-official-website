"use client";

import Image from "next/image";
import { useState } from "react";
import Title from "../Title";
import Typography from "../Typography";
import Section from "../Section";

export function Program() {
  const [activeProgram, setActiveProgram] = useState("Hankel Kindergarten");
  const ProgramNavItemList = [
    "Hankel Kindergarten",
    "Hankel Elementary",
    "Hankel Middle School",
    "Hankel Day Care",
  ];

  interface ProgramNavItemProps {
    name: string;
  }

  const ProgramNavItem = ({ name }: ProgramNavItemProps) => (
    <li
      className={`whitespace-nowrap ${
        activeProgram === name ? "px-[16px] bg-blue w-fit" : ""
      } h-9 flex flex-row justify-center items-center min-h-fit min-w-fit`}
      onClick={() => setActiveProgram(name)}
    >
      <Typography
        varient="h5"
        className={`${
          activeProgram === name ? "text-white" : "text-blue"
        } font-bold`}
      >
        {name}
      </Typography>
    </li>
  );
  return (
    <Section className="bg-gray">
      <Title>Our Program</Title>
      <ul className="w-full md:w-fit overflow-x-scroll flex-row flex justify-start gap-x-6 items-center mb-7 md:mb-[66px]">
        {ProgramNavItemList.map((name) => (
          <ProgramNavItem name={name} key={name} />
        ))}
      </ul>
      <div className="flex flex-col bg-white px-4 md:px-[60px] pt-4 md:pt-[48px] pb-4 md:pb-[32px] rounded md:rounded-none shadow md:shadow-none w-full md:w-[1042px] items-center">
        <Typography varient="h2" className="font-serif text-deepBlue mb-[15px]">
          {activeProgram}
        </Typography>
        <Typography varient="h5" className="text-textGray">
          Hankel International Academy&#39;s Kindergarten provides a nurturing
          environment for young minds to flourish. Our experienced educators
          prioritize hands-on learning, creativity, and critical thinking,
          laying a strong educational foundation. With a focus on exploration
          and discovery, children grow with confidence and joy, supported by a
          welcoming and inclusive atmosphere. Parents can trust their
          child&#39;s early education in our caring hands.
        </Typography>
        <div className="flex flex-row flex-1 justify-center my-[28px]">
          <Image
            src="/icons/InstagramBlue.svg"
            alt="hankel Instagram"
            width="24"
            height="24"
            className="mr-[24px]"
          ></Image>
          <Image
            src="/icons/FacebookBlue.svg"
            alt="hankel Facebook"
            width="24"
            height="24"
            className="mr-[24px]"
          ></Image>
          <Image
            src="/icons/YoutubeBlue.svg"
            alt="hankel Youtube"
            width="24"
            height="24"
          ></Image>
        </div>
        <div className="px-[32px] py-[8px] border rounded border-blue w-fit flex flex-row justify-center items-center">
          <Typography varient="h6" className="font-bold">
            Learn More
          </Typography>
          <Image
            src="/icons/ChevronRightFilled.svg"
            alt="hankel ChevronRightFilled"
            width="24"
            height="24"
            className="ml-[10px]"
          ></Image>
        </div>
      </div>
    </Section>
  );
}
