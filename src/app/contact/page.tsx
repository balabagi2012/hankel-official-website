import Banner from "@/components/Banner";
import Typography from "@/components/Typography";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hankel - Contact",
};

const title = "Contact Us";
const description = `Contact to Habkel`;

export default function Contact() {
  return (
    <main>
      <Banner
        size="medium"
        src="/banners/contact.png"
        title={title}
        description={description}
      ></Banner>
      <section className="flex flex-col py-[70px] items-center bg-gray">
        <div className="flex flex-col w-[700px]">
          <div className="mb-8 border-b border-deepBlue w-full">
            <Typography
              varient="h1"
              className="font-serif text-deepBlue text-center"
            >
              Contact Us
            </Typography>
          </div>
          <Typography varient="h5" className="text-textGray text-center">
            Do you have more questions and curiosity about us? Feel free to get
            in touch! We are eagerly looking forward to hearing your feedback,
            inquiries, and suggestions.
          </Typography>
          <div className="flex flex-row my-[40px] justify-center">
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
          <div className="bg-white flex flex-col shadow-2xl px-9 py-[18px]">
            <div className="flex flex-row items-center flex-1 mb-6">
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
            <div className="flex flex-row items-center flex-1 mb-6">
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
          </div>
        </div>
      </section>
      <section className="flex flex-col py-[70px] items-center bg-white">
        <div className="flex flex-col w-[700px]">
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
      </section>
    </main>
  );
}
