import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hankel - DayCare",
};

export default function DayCareInformation() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>DayCareInformation</p>
      </div>
    </main>
  );
}
