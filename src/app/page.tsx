import Banner from "@/components/Banner";
import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
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
      <section className="text-center pt-[66px] pb-[115px] px-[80px] flex flex-col items-center bg-gray">
        <Title>Our Program</Title>
        <div className="flex-row flex justify-center gap-x-6 items-center mb-[66px]">
          <div className="py-[8px] px-[16px] bg-blue">
            <Typography varient="h5" color="white" className="font-bold">
              Hankel Kindergarten
            </Typography>
          </div>
          <span className="w-[6px] h-[6px] border rounded bg-blue"></span>
          <div className="">
            <Typography varient="h5" color="blue">
              Hankel Elementary
            </Typography>
          </div>
          <span className="w-[6px] h-[6px] border rounded bg-blue"></span>
          <div className="">
            <Typography varient="h5" color="blue">
              Hankel Middle School
            </Typography>
          </div>
          <span className="w-[6px] h-[6px] border rounded bg-blue"></span>
          <div className="">
            <Typography varient="h5" color="blue">
              Hankel Day Care
            </Typography>
          </div>
        </div>
        <div className="flex flex-col bg-white px-[60px] pt-[48px] pb-[32px] w-[1042px] items-center">
          <Typography
            varient="h2"
            className="font-serif text-deepBlue mb-[15px]"
          >
            Hankel Kindergarten
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
      </section>
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
      <section className="text-center pt-[66px] pb-[115px] px-[80px] flex flex-col items-center bg-gray">
        <Title>Latest News</Title>
        <div className="flex flex-row mb-[52px] gap-4">
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
      <section className="text-center mt-[66px] mb-[115px] flex flex-col items-center">
        <div className="flex flex-row w-[1024px] items-stretch">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
