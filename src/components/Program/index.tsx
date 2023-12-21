"use client";

import Image from "next/image";
import { useState } from "react";
import Title from "../Title";
import Typography from "../Typography";
import Section from "../Section";
import { Program } from "@/app/api/home/route";
import Link from "next/link";

interface ProgramProps {
  lang: "en" | "zh";
  programs: Program[];
  title: string;
}

export function Program(props: ProgramProps) {
  const { programs, lang, title } = props;
  const [activeProgram, setActiveProgram] = useState(programs[0]);

  const ProgramNavItem = ({ program }: { program: Program }) => (
    <li
      className={`whitespace-nowrap ${
        activeProgram.type === program.type ? "px-[16px] bg-blue w-fit" : ""
      } h-9 flex flex-row justify-center items-center min-h-fit min-w-fit`}
      onClick={() => setActiveProgram(program)}
    >
      <Typography
        varient="h5"
        className={`${
          activeProgram.type === program.type ? "text-white" : "text-blue"
        } font-bold`}
      >
        {program.title[lang]}
      </Typography>
    </li>
  );
  return (
    <Section className="bg-bgGray">
      <Title>{title}</Title>
      <ul className="w-full md:w-fit overflow-x-scroll flex-row flex justify-start gap-x-6 items-center mb-7 md:mb-[66px]">
        {programs.map((program) => (
          <ProgramNavItem program={program} key={program.type} />
        ))}
      </ul>
      <div className="flex flex-col bg-white px-4 md:px-[60px] pt-4 md:pt-[48px] pb-4 md:pb-[32px] rounded md:rounded-none shadow md:shadow-none w-full md:w-[1042px] items-center">
        <Typography varient="h2" className="font-serif text-deepBlue mb-[15px]">
          {activeProgram.title[lang]}
        </Typography>
        <Typography varient="h5" className="text-textGray">
          {activeProgram.content[lang]}
        </Typography>
        <div className="flex flex-row flex-1 justify-center gap-x-6 my-[28px]">
          {activeProgram.instagram && (
            <Link href={activeProgram.instagram} rel="noopener noreferrer">
              <Image
                src="/icons/InstagramBlue.svg"
                alt="hankel Instagram"
                width="24"
                height="24"
              ></Image>
            </Link>
          )}
          {activeProgram.facebook && (
            <Link href={activeProgram.facebook} rel="noopener noreferrer">
              <Image
                src="/icons/FacebookBlue.svg"
                alt="hankel Facebook"
                width="24"
                height="24"
              ></Image>
            </Link>
          )}
          {activeProgram.youtube && (
            <Link href={activeProgram.youtube} rel="noopener noreferrer">
              <Image
                src="/icons/YoutubeBlue.svg"
                alt="hankel Youtube"
                width="24"
                height="24"
              ></Image>
            </Link>
          )}
          {activeProgram.line && (
            <Link href={activeProgram.line} rel="noopener noreferrer">
              <Image
                src="/icons/LineBlue.svg"
                alt="hankel line"
                width="24"
                height="24"
              ></Image>
            </Link>
          )}
        </div>
        <Link
          href={`/${lang}/${activeProgram.type}`}
          rel="noopener noreferrer"
          className="px-[32px] py-[8px] border rounded border-blue w-fit flex flex-row justify-center items-center"
        >
          <Typography varient="h6" className="font-bold">
            {lang === "en" ? "Learn More" : "了解更多"}
          </Typography>
          <Image
            src="/icons/ChevronRightFilled.svg"
            alt="hankel ChevronRightFilled"
            width="24"
            height="24"
            className="ml-[10px]"
          ></Image>
        </Link>
      </div>
    </Section>
  );
}
