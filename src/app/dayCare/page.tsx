import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";
import NavBar from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCare() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>DayCare</p>
      </div>

      <NavBar />
    </main>
  );
}
