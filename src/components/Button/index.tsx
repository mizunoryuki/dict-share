"use client";
import styles from "./index.module.css";

interface Props {
  color: "primary" | "secondary";
  text: string;
  onClick: () => void;
}

export const Button = ({ color = "primary", text, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[`button-${color}`]}`}
    >
      {text}
    </button>
  );
};
