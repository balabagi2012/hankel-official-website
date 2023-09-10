import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "@/app/components/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hankel",
};

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Home</p>
      </div>

      <NavBar />
    </main>
  );
}
