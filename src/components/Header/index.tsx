"use client";
import { Button } from "../Button";
import Image from "next/image";
import styles from "./index.module.css";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface Props {
  isHide?: boolean;
}

export default function Header({ isHide = true }: Props) {
  const router = useRouter();
  const handleLogOut = () => {
    try {
      signOut(auth);
      router.push("./");
    } catch (error) {
      console.log(`failed to logged out:${error}`);
    }
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.title}>
        <Image src={"../titleImage.svg"} alt="title" width={30} height={30} />
        <h1>share-dict</h1>
      </div>
      {isHide ? (
        <Button color="secondary" text="Logout" onClickAction={handleLogOut} />
      ) : (
        <></>
      )}
    </div>
  );
}
