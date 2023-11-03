import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hankel - Kindergarten",
};

export default function KindergartenCurriculum() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>KindergartenCurriculum</p>
      </div>
    </main>
  );
}
