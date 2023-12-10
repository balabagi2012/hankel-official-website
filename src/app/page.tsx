import Banner from "@/components/Banner";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import { Program } from "@/components/Program";
import Title from "@/components/Title";
import Typography from "@/components/Typography";

import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hankel",
};

const title = "Welcome";
const subtitle = "Hankel International Academy Experience";
const description = `​Hankel International Academy is Taiwan's top choice for multilingual education, offering a comprehensive program from Kindergarten to High School. We prepare students to excel in elite schools and universities globally, equipping them with the skills necessary for success in a demanding professional world. Our focus on academics, life skills, and character development ensures well-rounded individuals ready to make a positive impact.`;

export default function Home() {
  return (
    <main>
      <Banner
        size="big"
        src="/banners/home.png"
        title={title}
        subtitle={subtitle}
        description={description}
      ></Banner>
      <Program />
      <section>
        <Banner
          size="medium"
          src="/subBanners/teach.png"
          title="“Education is not the filling of a pail, but the lighting of a
              fire.”"
          description="------ William Butler Yeats
              "
        ></Banner>
      </section>
      <section className="text-center py-10 md:pt-[66px] md:pb-[115px] px-4 md:px-[80px] flex flex-col items-center bg-gray">
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
      <section className="text-center my-6 md:mt-[66px] md:mb-[115px] flex flex-col items-center">
        <div className="flex flex-col md:flex-row w-full md:w-[1024px] items-stretch">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
