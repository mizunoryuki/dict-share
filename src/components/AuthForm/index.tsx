import { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
  title: string;
  children: ReactNode;
}
export const AuthForm = ({ title, children }: Props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  );
};
