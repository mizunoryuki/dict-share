"use client";
import styles from "./index.module.css";

interface Props {
  color: "primary" | "secondary";
  text: string;
  onClickAction: () => void;
}

export const Button = ({ color = "primary", text, onClickAction }: Props) => {
  return (
    <button
      onClick={onClickAction}
      className={`${styles.button} ${styles[`button-${color}`]}`}
    >
      {text}
    </button>
  );
};
