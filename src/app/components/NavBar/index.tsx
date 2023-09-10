import styles from "./navBar.module.css";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className={styles.grid}>
      <Link href="/" className={styles.card} rel="noopener noreferrer">
        <div className="h3">Home</div>
      </Link>
      <Link href="/about" className={styles.card} rel="noopener noreferrer">
        <div className="h3">About</div>
      </Link>
      <Link href="/dayCare" className={styles.card} rel="noopener noreferrer">
        <div className="h3">Day Care</div>
      </Link>
      <Link
        href="/elementary"
        className={styles.card}
        rel="noopener noreferrer"
      >
        <div className="h3">Elementary</div>
      </Link>
      <Link
        href="/kindergarten"
        className={styles.card}
        rel="noopener noreferrer"
      >
        <div className="h3">Kindergarten</div>
      </Link>
      <Link
        href="/middleSchool"
        className={styles.card}
        rel="noopener noreferrer"
      >
        <div className="h3">Middle School</div>
      </Link>
    </div>
  );
}
