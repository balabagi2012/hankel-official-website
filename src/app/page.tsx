import Banner from "@/components/Banner";
import { Metadata } from "next";
import styles from "./page.module.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hankel",
};

const title = "Welcome";
const subtitle = "Hankel International Academy Experience";
const description = `​Hankel International Academy is Taiwan's top choice for multilingual education, offering a comprehensive program from Kindergarten to High School. We prepare students to excel in elite schools and universities globally, equipping them with the skills necessary for success in a demanding professional world. Our focus on academics, life skills, and character development ensures well-rounded individuals ready to make a positive impact.`;

export default function Home() {
  return (
    <main className={styles.main}>
      <Banner
        size="big"
        src="/banners/home.png"
        title={title}
        subtitle={subtitle}
        description={description}
      ></Banner>
      <section className="text-center">
        <div className="font-bold">Our Program</div>
        <div className="flex-row flex justify-center">
          <div>Hankel Kindergarten</div>
          <div>Hankel Elementary</div>
          <div>Hankel Middle School</div>
          <div>Hankel Day Care</div>
        </div>
        <div>
          <div className="font-bold">Hankel Kindergarten</div>
          <div>
            Hankel International Academy&#39;s Kindergarten provides a nurturing
            environment for young minds to flourish. Our experienced educators
            prioritize hands-on learning, creativity, and critical thinking,
            laying a strong educational foundation. With a focus on exploration
            and discovery, children grow with confidence and joy, supported by a
            welcoming and inclusive atmosphere. Parents can trust their
            child&#39;s early education in our caring hands.
          </div>
          <div className="flex flex-row flex-1 justify-center">
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
          <div>Learn More</div>
        </div>
      </section>
      <section>
        <Banner
          size="small"
          src="/subBanners/teach.png"
          title="“Education is not the filling of a pail, but the lighting of a fire.”"
        ></Banner>
      </section>
      <section>
        <div>Latest News</div>
      </section>
      <section>
        <div>Contact Us</div>
      </section>
    </main>
  );
}
