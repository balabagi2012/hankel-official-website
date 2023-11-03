import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function ElementaryTeam() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>ElementaryTeam</p>
      </div>
    </main>
  );
}
