import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCareContact() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>DayCareContact</p>
      </div>
    </main>
  );
}
