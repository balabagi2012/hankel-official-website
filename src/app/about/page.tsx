import { Metadata } from "next";
import styles from "./page.module.css";
import Banner from "@/components/Banner";

export const metadata: Metadata = {
  title: "Hankel - About",
};

const title = "About Us";
const description = `Finding Inspiration in Every Turn`;

export default function About() {
  return (
    <main className={styles.main}>
      <Banner
        size="medium"
        src="/banners/about.png"
        title={title}
        description={description}
      ></Banner>
    </main>
  );
}
