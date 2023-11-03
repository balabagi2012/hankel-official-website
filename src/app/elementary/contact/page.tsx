import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function ElementaryContact() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>ElementaryContact</p>
      </div>
    </main>
  );
}
