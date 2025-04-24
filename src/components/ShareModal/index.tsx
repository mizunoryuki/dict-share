import { Dispatch, SetStateAction, useState } from "react";
import styles from "./index.module.css";
import { Button } from "../Button";
interface Props {
  isOpen: boolean;
  setIsOpenAction: Dispatch<SetStateAction<boolean>>;
}
export default function ShareModal({ isOpen, setIsOpenAction }: Props) {
  const [isOn, setIsOn] = useState<boolean>(false);
  const handleClick = () => {
    //公開設定のアップデート
    setIsOn(!isOn);
    console.log(!isOn);
  };
  const handleClose = () => {
    setIsOpenAction(false);
  };
  if (!isOpen) return null;
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>辞書を公開</h2>
        <div className={styles.toggleContainer}>
          <div className={styles.toggleBox}>
            <p>他のユーザからの閲覧を許可する</p>
            <button onClick={() => handleClick()}>toggle</button>
          </div>
          <div className={styles.content}>
            {isOn ? (
              <div className={styles.urlBox}>
                <p className={styles.url}>URL</p>
                <button
                  className={styles.copyButton}
                  onClick={() => console.log("copy")}
                >
                  copy
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={styles.buttonBox}>
          <Button color="secondary" text="とじる" onClickAction={handleClose} />
        </div>
      </div>
    </div>
  );
}
