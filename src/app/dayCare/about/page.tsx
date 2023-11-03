import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCareAbout() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>DayCareAbout</p>
      </div>
    </main>
  );
}
