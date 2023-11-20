import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";
import Header from "@/components/Header";
import Banner from "@/components/Banner";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function Kindergarten() {
  return (
    <main className={styles.main}>
      <Banner size="small" src="/banners/school.png"></Banner>
      <div className={styles.description}>
        <p>Kindergarten</p>
      </div>
    </main>
  );
}
