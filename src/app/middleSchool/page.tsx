import { Metadata } from "next";
import styles from "./page.module.css";
import Banner from "@/components/Banner";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hankel - MiddleSchool",
};

export default function MiddleSchool() {
  return (
    <main className={styles.main}>
      <Banner size="small" src="/banners/school.png"></Banner>
      <div className={styles.description}>
        <p>MiddleSchool</p>
      </div>
    </main>
  );
}
