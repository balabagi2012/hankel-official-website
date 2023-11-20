import { Metadata } from "next";
import styles from "./page.module.css";
import Banner from "@/components/Banner";

export const metadata: Metadata = {
  title: "Hankel - Contact",
};

const title = "Contact Us";
const description = `Contact to Habkel`;


export default function Contact() {
  return (
    <main className={styles.main}>
      <Banner
        size="medium"
        src="/banners/contact.png"
        title={title}
        description={description}
      ></Banner>
    </main>
  );
}
