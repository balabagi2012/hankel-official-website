import { Metadata } from "next";
import styles from "./page.module.css";
import Banner from "@/components/Banner";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function ElementaryContact() {
  return (
    <main className={styles.main}>
      <Banner size="small" src="/banners/school.png"></Banner>
    </main>
  );
}
