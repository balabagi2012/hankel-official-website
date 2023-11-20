import { Metadata } from "next";
import styles from "./page.module.css";
import Banner from "@/components/Banner";

export const metadata: Metadata = {
  title: "Hankel - News",
};

const title = "Contact Us";
const description = `Contact to Habkel`;

export default function News() {
  return (
    <main className={styles.main}>
      <Banner
        size="medium"
        src="/banners/news.png"
        title={title}
        description={description}
      ></Banner>
    </main>
  );
}
