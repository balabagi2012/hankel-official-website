import Banner from "@/components/Banner";
import Card from "@/components/Card";
import Title from "@/components/Title";
import Typography from "@/components/Typography";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCare() {
  const sectionTexts = [
    `Hankel Education cultivates students' curiosity, creativity, and
  academic excellence with the spirit of seeking truth, fostering
  virtue, and pursuing aesthetics. Through our distinctive teaching
  approach of "Multilingualism," "Scientific Research," and
  "Activities," we shape well-rounded individuals, preparing them for
  a future of unlimited possibilities.`,
    `"Thriving Growth" embodies our commitment to nurturing the
  potential of every student. Through innovative methods, we
  encourage them to explore, challenge themselves, and build
  confidence. `,
    `"Pursuit of Excellence" represents our dedication to
  outstanding education. We inspire students to embrace
  challenges, cultivate resilience, and foster a passion for
  learning through innovative methods.`,
    `The value of "Learning" underscores our emphasis on knowledge
  and creativity. We encourage curiosity, critical thinking, and
  problem-solving skills, providing students with superior and
  innovative skills necessary for their future. `,
  ];
  return (
    <main>
      <Banner size="small" src="/banners/school.png" />
      <section className="flex flex-col items-center py-[70px] bg-gray">
        <Title align="center">The Hankel Experience</Title>
        <div className="w-[1024px]">
          <Typography varient="h5" className="mb-[80px]">
            {sectionTexts[0]}
          </Typography>
          <div className="flex flex-row justify-between">
            {[1, 2, 3].map((element) => (
              <Card
                key={`course ${element}`}
                type="course"
                img={`/course/${element}.png`}
                alt={`hankel news ${element}`}
                title="Coding in class"
                description={sectionTexts[element]}
              ></Card>
            ))}
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
      <section className="text-center pt-[66px] pb-[115px] px-[80px] flex flex-col items-center bg-white">
        <Title align="center">Latest News</Title>
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
      <section className="text-center pt-[66px] pb-[115px] px-[80px] flex flex-col items-center bg-gray">
        <Title align="center">Social Media Post</Title>
        <div className="flex flex-row mb-[52px] gap-4">
          <div className="flex flex-col">
            <Typography varient="h2" className="font-serif text-deepBlue mb-5">
              Instagram
            </Typography>
            <div className="flex flex-col gap-y-5">
              <div className="flex flex-row flex-1 justify-between">
                <Image
                  src="/instagram/1.png"
                  alt="hankel Instagram"
                  width="200"
                  height="200"
                ></Image>
                <Image
                  src="/instagram/2.png"
                  alt="hankel Facebook"
                  width="200"
                  height="200"
                ></Image>
                <Image
                  src="/instagram/3.png"
                  alt="hankel Youtube"
                  width="200"
                  height="200"
                ></Image>
                <Image
                  src="/instagram/4.png"
                  alt="hankel Line"
                  width="200"
                  height="200"
                ></Image>
              </div>
              <div className="flex flex-row flex-1 justify-between">
                <Image
                  src="/instagram/5.png"
                  alt="hankel Instagram"
                  width="200"
                  height="200"
                ></Image>
                <Image
                  src="/instagram/6.png"
                  alt="hankel Facebook"
                  width="200"
                  height="200"
                ></Image>
                <Image
                  src="/instagram/7.png"
                  alt="hankel Youtube"
                  width="200"
                  height="200"
                ></Image>
                <Image
                  src="/instagram/8.png"
                  alt="hankel Line"
                  width="200"
                  height="200"
                ></Image>
              </div>
            </div>
          </div>
          <div>
            <Typography varient="h2" className="font-serif text-deepBlue mb-5">
              Facebook
            </Typography>
            {/* <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FHIAPE.LK&tabs=timeline&width=280&height=420&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1540608879363126" width="280" height="420"  frameBorder={0} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" /> */}
          </div>
        </div>
      </section>
      <section className="text-center mt-[66px] mb-[115px] flex flex-col items-center">
        <div className="flex flex-row w-[1024px] items-stretch">
          <div className="flex flex-1 flex-col items-start justify-around">
            <Title full align="left">
              Contact Us
            </Title>
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
                <input
                  type="text"
                  className="border rounded border-textGray h-9"
                />
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
                <input
                  type="text"
                  className="border rounded border-textGray h-9"
                />
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
            <div className="bg-blue h-[44px] flex flex-row items-center justify-center rounded">
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
