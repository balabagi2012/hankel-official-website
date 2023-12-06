import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hankel - News",
};

export default function News() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>News</p>
      </div>
    </main>
  );
}
