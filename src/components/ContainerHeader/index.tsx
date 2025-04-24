import { useRouter } from "next/navigation";
import { Button } from "../Button";
import styles from "./index.module.css";
import { Dispatch, SetStateAction } from "react";

interface Props {
  title: string;
  dictId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ContainerHeader({ title, dictId, setIsOpen }: Props) {
  const router = useRouter();

  const handleClick = () => {
    setIsOpen(true);
    //router.push(`/shared?id=${dictId}`);
  };
  return (
    <div className={styles.header}>
      <h2 className={styles.headerTitle}>{title}</h2>
      <Button color="primary" text="共有" onClickAction={handleClick} />
    </div>
  );
}
