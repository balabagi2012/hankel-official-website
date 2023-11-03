import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function Elementary() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Elementary</p>
      </div>
    </main>
  );
}
