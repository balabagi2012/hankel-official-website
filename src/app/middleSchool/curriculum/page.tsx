import { Metadata } from "next";
import styles from "./page.module.css";
import Banner from "@/components/Banner";

export const metadata: Metadata = {
  title: "Hankel - MiddleSchool",
};

export default function MiddleSchoolCurriculum() {
  return (
    <main className={styles.main}>
      <Banner size="small" src="/banners/school.png"></Banner>
      <div className={styles.description}>
        <p>MiddleSchoolCurriculum</p>
      </div>
    </main>
  );
}
