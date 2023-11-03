import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hankel - Elementary",
};

export default function ElementaryInformation() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>ElementaryInformation</p>
      </div>
    </main>
  );
}
