import Banner from "@/components/Banner";
import Typography from "@/components/Typography";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hankel - About",
};

const title = "About Us";
const description = `Finding Inspiration in Every Turn`;

export default function About() {
  return (
    <main>
      <Banner
        size="medium"
        src="/banners/about.png"
        title={title}
        description={description}
      ></Banner>
      <section className="bg-gray py-[60px] flex flex-row justify-center">
        <div className="flex flex-row w-[1024px] justify-center items-stretch">
          <div className="flex-1 flex flex-col mr-[65px] gap-y-3">
            <Image
              src="/about/1.png"
              alt="hankel about 1"
              width="585"
              height="369"
            ></Image>
            <Image
              src="/about/2.png"
              alt="hankel about 2"
              width="585"
              height="369"
            ></Image>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="mb-9 border-b border-deepBlue w-full">
              <Typography
                varient="h1"
                className="font-serif text-deepBlue text-start"
              >
                About Us
              </Typography>
            </div>
            <div className="flex flex-1 flex-col">
              <Typography
                varient="h4"
                className="font-serif text-blue text-start mb-5"
              >
                Bilingual programs specifically cater to the development of
                young learners
              </Typography>
              <Typography
                varient="h5"
                className="font-serif text-textGray text-start"
              >
                Welcome to Hankel International Academy (HIA), the pinnacle of
                educational excellence and innovation. As the flagship
                institution under Shane Education, HIA stands distinct in
                offering unparalleled educational experiences. Our school's
                focus extends beyond traditional language centers, catering
                exclusively to the development of young learners through
                comprehensive all-day English and bilingual programs.
              </Typography>
            </div>
            <div className="flex flex-1 flex-col mt-[60px]">
              <Typography
                varient="h4"
                className="font-serif text-blue text-start mb-5"
              >
                HIA's Purpose-Built Campus: A Commitment to Nurturing Education
              </Typography>
              <Typography
                varient="h5"
                className="font-serif text-textGray text-start"
              >
                Nestled in the serene suburban enclave of Linkou, New Taipei
                City, HIA boasts a purpose-built campus that embodies our
                commitment to providing a nurturing and stimulating environment.
                Notably, our campus serves as the prestigious home to both HIA
                and the corporate headquarters of Shane English School Taiwan, a
                testament to our dedication to educational advancement.
              </Typography>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
