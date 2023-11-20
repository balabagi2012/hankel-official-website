import Banner from "@/components/Banner";
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
        <div className="mb-[60px] border-b border-deepBlue w-fit">
          <Typography varient="h1" className="font-serif text-deepBlue">
            Our Program
          </Typography>
        </div>
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
        <Banner size="small" src="/subBanners/teach.png">
          <div className="ml-auto mr-[76px] px-[52px] py-[28px] bg-white border-b border-blue border-l-8 relative">
            <Typography varient="h4" className="font-serif text-textGray">
              “Education is not the filling of a pail, but the lighting of a
              fire.”
            </Typography>
            <Typography
              varient="h5"
              className="font-serif text-textGray text-right mt=[12px]"
            >
              ------ William Butler Yeats
            </Typography>
            <Image
              src="/icons/Quotes.svg"
              alt="hankel quote"
              width="41"
              height="35"
              className="absolute top-[-17px] left-[-23px]"
            ></Image>
          </div>
        </Banner>
      </section>
      <section className="text-center pt-[66px] pb-[115px] px-[80px] flex flex-col items-center bg-gray">
        <div className="mb-[60px] border-b border-deepBlue w-fit">
          <Typography varient="h1" className="font-serif text-deepBlue">
            Latest News
          </Typography>
        </div>
        <div className="flex flex-row mb-[52px] gap-4">
          {[1, 2, 3, 4, 5].map((element) => (
            <div className="relative" key={`news ${element}`}>
              <Image
                src={`/news/${element}.png`}
                alt={`hankel news ${element}`}
                width="233"
                height="415"
              ></Image>
              <div className="absolute bottom-[18px] h-[100px] left-0 bg-deepBlue/[0.8] pl-[12px] pr-[4px] py-[8px] flex flex-col items-start">
                <Typography varient="h4" color="white font-serif text-start">
                  Coding in class
                </Typography>
                <Typography varient="body" color="white font-serif text-start">
                  Programming classes in camp
                </Typography>
              </div>
            </div>
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
          <div className="flex flex-1 flex-col items-start justify-around">
            <div className="border-b border-deepBlue w-full text-start flex-1 mb-6">
              <Typography varient="h1" className="font-serif text-deepBlue">
                Contact Us
              </Typography>
            </div>
            <Typography varient="h5" className="text-start flex-1">
              Do you have more questions and curiosity about us? Feel free to
              get in touch! We are eagerly looking forward to hearing your
              feedback, inquiries, and suggestions.
            </Typography>
            <div className="flex flex-row items-center flex-1">
              <Image
                src="/icons/PhoneOutlined.svg"
                alt="hankel PhoneOutlined"
                width="24"
                height="24"
                className="mr-3"
              ></Image>
              <Typography varient="h5" className="text-start">
                (02) 7751-9199
              </Typography>
            </div>
            <div className="flex flex-row items-center flex-1">
              <Image
                src="/icons/MailOutlined.svg"
                alt="hankel MailOutlined"
                width="24"
                height="24"
                className="mr-3"
              ></Image>
              <Typography varient="h5" className="text-start">
                hankel@heipe.edu.tw
              </Typography>
            </div>
            <div className="flex flex-row items-start flex-1">
              <Image
                src="/icons/LocationOnOutlined.svg"
                alt="hankel LocationOnOutlined"
                width="24"
                height="24"
                className="mr-3 mt-2"
              ></Image>
              <Typography varient="h5" className="text-start flex-wrap">
                No. 457, Section 2, Wenhua 3rd Rd, Linkou District, New Taipei
                City, 244
              </Typography>
            </div>
            <div className="flex flex-row flex-1">
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
                className="mr-[24px]"
              ></Image>
              <Image
                src="/icons/Line.svg"
                alt="hankel Line"
                width="24"
                height="24"
              ></Image>
            </div>
          </div>
          <div className="flex-1 pl-[70px] flex flex-col pt-7 justify-between">
            <div className="flex flex-row gap-4 mb-5">
              <div className="flex flex-col flex-1">
                <div className="flex flex-row align-top">
                  <Typography varient="h5" className="text-deepBlue">
                    Name
                  </Typography>
                  <Typography varient="h5" className="text-[#D40000]">
                    *
                  </Typography>
                </div>
                <input type="text" className="border rounded border-textGray h-9" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex flex-row align-top gap-4">
                  <Typography varient="h5" className="text-deepBlue">
                    Phone
                  </Typography>
                  <Typography varient="h5" className="text-[#D40000]">
                    *
                  </Typography>
                </div>
                <input type="text" className="border rounded border-textGray h-9" />
              </div>
            </div>
            <div className="flex flex-1 flex-col mb-5">
              <div className="flex flex-row align-top gap-4">
                <Typography varient="h5" className="text-deepBlue">
                  Email
                </Typography>
                <Typography varient="h5" className="text-[#D40000]">
                  *
                </Typography>
              </div>
              <input type="text" className="border rounded border-textGray" />
            </div>
            <div className="flex flex-1 flex-col mb-8">
              <div className="flex flex-row align-top">
                <Typography varient="h5" className="text-deepBlue">
                  Message
                </Typography>
                <Typography varient="h5" className="text-[#D40000]">
                  *
                </Typography>
              </div>
              <textarea className="border h-[130px] rounded border-textGray" />
            </div>
            <div className="bg-blue h-[44px] flex flex-row items-center justify-center">
              <Typography varient="h5" color="white">
                Send
              </Typography>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
