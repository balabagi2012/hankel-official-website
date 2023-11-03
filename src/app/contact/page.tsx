import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hankel - Contact",
};

export default function Contact() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Contact</p>
      </div>
    </main>
  );
}
