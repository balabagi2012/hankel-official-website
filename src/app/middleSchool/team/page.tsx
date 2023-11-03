import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hankel - MiddleSchool",
};

export default function MiddleSchoolTeam() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>MiddleSchoolTeam</p>
      </div>
    </main>
  );
}
