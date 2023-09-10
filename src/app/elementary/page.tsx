import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";
import NavBar from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function Elementary() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Elementary</p>
      </div>

      <NavBar />
    </main>
  );
}
