import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";
import NavBar from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "Hankel - MiddleSchool",
};

export default function MiddleSchool() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>MiddleSchool</p>
      </div>

      <NavBar />
    </main>
  );
}
