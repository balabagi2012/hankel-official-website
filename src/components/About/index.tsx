import Image from "next/image";
import Title from "../Title";
import Typography from "../Typography";
import { kindergarten } from "@/app/styles/fonts";
import Banner from "../Banner";

export interface AboutProps {
  type?: "kindergarten" | "subschool" | "home";
  title?: string;
  description?: string;
  banner?: string;
}
export default function About(props: AboutProps) {
  const { type = "subschool", title, description, banner } = props;
  return (
    <main
      className={`pt-[50px] ${
        type === "home" ? "md:pt-[80px]" : "md:pt-[200px]"
      }`}
    >
      <Banner
        size={type === "home" ? "large" : "small"}
        src={banner ?? "/banners/school.png"}
        title={title}
        description={description}
      ></Banner>
      <section className="bg-gray px-4 md:px-0 py-8 md:py-[60px] flex flex-row justify-center">
        <div className="flex flex-col-reverse md:flex-row w-full md:w-[1180px] justify-center items-stretch">
          <div className="flex flex-col mr-[65px] gap-y-3">
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
            <Title full align="left" type={type}>
              About Us
            </Title>
            <div className="flex flex-1 flex-col">
              <Typography
                varient="h4"
                className={`font-serif text-blue text-start mb-5 ${
                  type === "kindergarten" ? kindergarten.className : ""
                }`}
              >
                Bilingual programs specifically cater to the development of
                young learners
              </Typography>
              <Typography varient="h5" className="text-textGray text-start">
                {`Welcome to Hankel International Academy (HIA), the pinnacle of
                educational excellence and innovation. As the flagship
                institution under Shane Education, HIA stands distinct in
                offering unparalleled educational experiences. Our school's
                focus extends beyond traditional language centers, catering
                exclusively to the development of young learners through
                comprehensive all-day English and bilingual programs.`}
              </Typography>
            </div>
            <div className="flex flex-1 flex-col mt-[60px]">
              <Typography
                varient="h4"
                className={`font-serif text-blue text-start mb-5 ${
                  type === "kindergarten" ? kindergarten.className : ""
                }`}
              >
                {`HIA's Purpose-Built Campus: A Commitment to Nurturing Education`}
              </Typography>
              <Typography varient="h5" className="text-textGray text-start mb-8 md:mb-0">
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
      <section className="bg-white px-4 md:px-0 py-8 md:py-[60px] flex flex-row justify-center">
        <div className="flex flex-col md:flex-row w-full md:w-[1180px] justify-center items-stretch">
          <div className="flex flex-col mr-[65px] gap-y-3 flex-1">
            <Title full align="left" type={type}>
              Our Story
            </Title>
            <Typography varient="h5" className="text-textGray text-start mb-8">
              Since its inauguration in August 2020, HIA has swiftly integrated
              itself within the community, garnering a robust reputation among
              parents. This achievement is largely attributed to the relentless
              dedication of our hardworking staff and educators who have made
              fostering academic excellence, character development, and a love
              for learning their mission.
            </Typography>
            <Typography varient="h5" className="text-textGray text-start mb-8 md:mb-0">
              {`At HIA, we embody the values of "Thrive," "Strive," and "Learn,"
              fostering holistic growth, unyielding pursuit of excellence, and
              innovative educational methods. Join us on a journey where young
              minds flourish, curiosity thrives, and every student is empowered
              to reach their full potential.`}
            </Typography>
          </div>
          <Image
            src="/about/3.png"
            alt="hankel about 3"
            width="667"
            height="429"
          ></Image>
        </div>
      </section>
    </main>
  );
}
