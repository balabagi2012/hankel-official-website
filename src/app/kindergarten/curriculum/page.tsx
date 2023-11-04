import { Metadata } from "next";
import styles from "./page.module.css";
import Banner from "@/components/Banner";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function KindergartenCurriculum() {
  return (
    <main className={styles.main}>
      <Banner size="small" src="/banners/school.png"></Banner>
      <div className={styles.description}>
        <p>KindergartenCurriculum</p>
      </div>
    </main>
  );
}
