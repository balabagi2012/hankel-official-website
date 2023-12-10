import Image from "next/image";
import Card from "../Card";
import Title from "../Title";
import Typography from "../Typography";
import Section from "../Section";

export interface LatestNewsProps {
  className?: string;
}
export default function LatestNews({ className = "" }: LatestNewsProps) {
  return (
    <Section className={`bg-gray ${className}`}>
      <Title>Latest News</Title>
      <div className="w-full flex flex-row overflow-x-scroll mb-[52px] gap-4">
        {[1, 2, 3, 4, 5].map((element) => (
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
      <div className="px-[32px] py-[8px] border rounded border-blue w-fit flex flex-row justify-center items-center">
        <Typography varient="h6" className="font-bold">
          View More
        </Typography>
        <Image
          src="/icons/ChevronRightFilled.svg"
          alt="hankel ChevronRightFilled"
          width="24"
          height="24"
          className="ml-[10px]"
        ></Image>
      </div>
    </Section>
  );
}
