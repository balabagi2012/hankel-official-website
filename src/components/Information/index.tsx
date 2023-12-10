import Image from "next/image";
import LunchMenuImg from "../../../public/information/lunch.png";
import Title from "../Title";
import Typography from "../Typography";

import CalendarImg from "../../../public/information/calendar.png";
import Banner from "../Banner";
import Section from "../Section";

export interface InformationProps {
  type?: "kindergarten" | "subschool";
  banner?: string;
}

export default function Information(props: InformationProps) {
  const { type = "subschool", banner = "/banners/school.png" } = props;

  return (
    <main className="pt-[50px] md:pt-[200px]">
      <Banner size="small" src={banner}></Banner>
      <Section className="bg-gray">
        <div className="flex flex-col w-[1024px]">
          <Title full align="center" type={type}>
            Admission Brochure
          </Title>
          <Typography varient="h5" className="text-textGray">
            text text text text text text text text text text text text text
            text text text text text text text text text text text text text
            text text text text text text text text text text .
          </Typography>
          <div className="mt-[60px] py-2 flex flex-row justify-center border items-center rounded border-deepBlue bg-white">
            <Typography varient="h5" className="text-deepBlue">
              Downolad
            </Typography>
            <Image
              src="/icons/DownloadOutlined.svg"
              alt="hankel Facebook"
              width="24"
              height="24"
              className="ml-[24px]"
            ></Image>
          </div>
        </div>
      </Section>
      <Section className="bg-white">
        <div className="flex flex-row w-[1268px] justify-center items-stretch">
          <div className="flex flex-col mr-[65px] gap-y-3 flex-1">
            <Title full align="left" type={type}>
              Information Session
            </Title>
            <Typography varient="h5" className="text-textGray text-start mb-8">
              Since its inauguration in August 2020, HIA has swiftly integrated
              itself within the community, garnering a robust reputation among
              parents. This achievement is largely attributed to the relentless
              dedication of our hardworking staff and educators who have made
              fostering academic excellence, character development, and a love
              for learning their mission.
            </Typography>
          </div>
          <Image
            src="/information/session.png"
            alt="hankel about 3"
            width="582"
            height="370"
          ></Image>
        </div>
      </Section>
      <Section className="bg-gray">
        <div className="flex flex-col w-[1268px] justify-center items-stretch">
          <Title full align="left" type={type}>
            Lunch Menu
          </Title>
          <div className="w-full">
            <Image
              src={LunchMenuImg}
              alt="hankel Facility"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            ></Image>
          </div>
        </div>
      </Section>
      <Section className="bg-white">
        <div className="flex flex-col w-[1268px] justify-center items-stretch">
          <Title full align="left" type={type}>
            Calendar
          </Title>
          <div className="w-full">
            <Image
              src={CalendarImg}
              alt="hankel calendar"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            ></Image>
          </div>
        </div>
      </Section>
    </main>
  );
}
