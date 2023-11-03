import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function KindergartenContact() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>KindergartenContact</p>
      </div>
    </main>
  );
}
