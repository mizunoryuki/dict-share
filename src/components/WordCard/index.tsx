import Image from "next/image";
import styles from "./index.module.css";
interface Props {
  name: string;
  discription: string;
}
export default function WordCard({ name, discription }: Props) {
  return (
    <div className={styles.wordContainer}>
      <div className={styles.nameBox}>
        <p className={styles.wordName}>{name}</p>
        <Image
          src={"../editImage.svg"}
          alt="edit"
          width={30}
          height={30}
          onClick={() => console.log("edit card")}
        />
      </div>
      <div className={styles.wordDisc}>{discription}</div>
    </div>
  );
}
