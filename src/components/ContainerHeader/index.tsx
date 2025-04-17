import { Button } from "../Button";
import styles from "./index.module.css";

export default function ContainerHeader() {
  return (
    <div className={styles.header}>
      <h2>辞書タイトル</h2>
      <Button
        color="primary"
        text="共有"
        onClickAction={() => console.log("共有")}
      />
    </div>
  );
}
