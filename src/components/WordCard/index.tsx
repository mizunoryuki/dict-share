import styles from "./index.module.css";
interface Props {
  name: string;
  discription: string;
}
export default function WordCard({ name, discription }: Props) {
  return (
    <div className={styles.wordContainer}>
      <p className={styles.wordName}>{name}</p>
      <div className={styles.wordDisc}>{discription}</div>
    </div>
  );
}
