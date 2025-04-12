import styles from "./page.module.css";
import AuthCard from "@/components/AuthCard";

export default function Home() {
  return (
    <div className={styles.page}>
      <AuthCard type="signIn" />
    </div>
  );
}
