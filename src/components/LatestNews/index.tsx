import Image from "next/image";
import Card from "../Card";
import Title from "../Title";
import Typography from "../Typography";

export interface LatestNewsProps {
  className?: string;
}
export default function LatestNews({ className = "" }: LatestNewsProps) {
  return (
    <section
      className={`text-center py-10 md:pt-[66px] md:pb-[115px] px-4 md:px-[80px] flex flex-col items-center bg-gray ${className}`}
    >
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
    </section>
  );
}
