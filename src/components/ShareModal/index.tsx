import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./index.module.css";
import { Button } from "../Button";
import { useAuth } from "@/context/AuthProvider";
import { useParams } from "next/navigation";
interface Props {
  isOpen: boolean;
  setIsOpenAction: Dispatch<SetStateAction<boolean>>;
}
export default function ShareModal({ isOpen, setIsOpenAction }: Props) {
  const params = useParams();
  const { user } = useAuth();
  const dictId = String(params.id);
  const [isChecked, setIsChecked] = useState<boolean>(false); //共有の可否(true : 許可,false : 許可なし)

  useEffect(() => {
    if (!user || !dictId) return;
    const handleFetch = async (userId: string, dictId: string) => {
      const res = await fetch(
        `/api/share-dict/public-info?userId=${userId}&dictId=${dictId}`
      );
      const data = await res.json();
      setIsChecked(data.result);
    };

    handleFetch(user.uid, dictId);
  }, [dictId, user]);

  const handleClick = () => {
    //公開設定のアップデート
    if (!user || !dictId) return;
    const handleFetch = async (userId: string, dictId: string) => {
      try {
        const res = await fetch("/api/share-dict/public-info", {
          method: "POST",
          body: JSON.stringify({ userId, dictId }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data.error);
          alert("指定された辞書Idが間違っています");
        } else {
          setIsChecked((prev) => !prev);
        }
      } catch (e) {
        console.log(e);
      }
    };
    handleFetch(user.uid, dictId);
  };
  const handleClose = () => {
    setIsOpenAction(false);
  };

  const handleCopyText = () => {
    const urlText = `${window.location.origin}/shared?id=${dictId}`;
    navigator.clipboard.writeText(urlText).then(
      () => {
        console.log("successfully copy URL");
        alert("コピー成功!!");
      },
      () => {
        console.log("failed to copy URL");
        alert("コピー失敗!!");
      }
    );
  };
  if (!isOpen) return null;
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>辞書を公開</h2>
        <div className={styles.toggleContainer}>
          <div className={styles.toggleBox}>
            <p>他のユーザからの閲覧を許可する</p>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleClick}
              />
            </label>
          </div>
          <div className={styles.content}>
            {isChecked ? (
              <div className={styles.copyBox}>
                <Button
                  color="primary"
                  text="共有URLをコピー"
                  onClickAction={handleCopyText}
                />
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
