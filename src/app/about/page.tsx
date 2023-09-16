import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";
import NavBar from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "Hankel - About",
};

export default function About() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>About</p>
      </div>
      <NavBar />
    </main>
  );
}
