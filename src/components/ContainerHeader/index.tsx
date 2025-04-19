import { Button } from "../Button";
import styles from "./index.module.css";

interface Props {
  title: string;
}

export default function ContainerHeader({ title }: Props) {
  return (
    <div className={styles.header}>
      <h2 className={styles.headerTitle}>{title}</h2>
      <Button
        color="primary"
        text="共有"
        onClickAction={() => console.log("共有")}
      />
    </div>
  );
}
