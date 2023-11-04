import Banner from "@/components/Banner";
import { Metadata } from "next";
import styles from "./page.module.css";

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
    </main>
  );
}
