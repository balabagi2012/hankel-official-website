import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hankel - About",
};

export default function About() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>About</p>
      </div>
    </main>
  );
}
