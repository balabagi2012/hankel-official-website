import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hankel",
};

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p className="text-3xl">Home</p>
      </div>
    </main>
  );
}
