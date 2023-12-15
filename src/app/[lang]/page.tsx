import Banner from "@/components/Banner";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import LatestNews from "@/components/LatestNews";
import { Program } from "@/components/Program";
import Section from "@/components/Section";

import { Metadata } from "next";

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
      <Banner
        size="medium"
        src="/subBanners/teach.png"
        title="“Education is not the filling of a pail, but the lighting of a
              fire.”"
        description="------ William Butler Yeats
              "
      ></Banner>
      <LatestNews />
      <Section>
        <div className="flex flex-col md:flex-row w-full md:w-[1024px] items-stretch">
          <ContactInfo />
          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
