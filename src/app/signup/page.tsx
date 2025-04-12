import AuthCard from "@/components/AuthCard";
import styles from "./page.module.css";
export default function SignUp() {
  return (
    <div className={styles.page}>
      <AuthCard type="signUp" />
    </div>
  );
}
