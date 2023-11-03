import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hankel - MiddleSchool",
};

export default function MiddleSchoolContact() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>MiddleSchoolContact</p>
      </div>
    </main>
  );
}
