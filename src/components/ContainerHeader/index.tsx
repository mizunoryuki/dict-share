import { Button } from "../Button";
import styles from "./index.module.css";
import { Dispatch, SetStateAction } from "react";

interface Props {
  title: string;
  dictId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ContainerHeader({ title, setIsOpen }: Props) {
  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <div className={styles.header}>
      <h2 className={styles.headerTitle}>{title}</h2>
      <Button color="primary" text="共有" onClickAction={handleClick} />
    </div>
  );
}
