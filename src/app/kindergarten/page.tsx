import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function Kindergarten() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Kindergarten</p>
      </div>
    </main>
  );
}
