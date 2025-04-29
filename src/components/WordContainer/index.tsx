import WordCard from "../WordCard";
import styles from "./index.module.css";
import ContainerHeader from "../ContainerHeader";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useParams } from "next/navigation";
import { useDictData } from "@/hooks/useDictData";
interface Props {
  setIsOpenAction: Dispatch<SetStateAction<boolean>>;
}

export default function WordContainer({ setIsOpenAction }: Props) {
  const { user } = useAuth();
  const params = useParams<{ id: string }>();
  const { dictData, fetchDictData } = useDictData(user?.uid, params.id);

  useEffect(() => {
    fetchDictData();
  }, [fetchDictData]);

  return (
    <div className={styles.container}>
      <ContainerHeader
        title={dictData.dictName}
        dictId={dictData.id}
        setIsOpen={setIsOpenAction}
      />
      <div className={styles.cardBox}>
        {dictData.words.length >= 1 ? (
          dictData.words.map((value, index) => {
            return (
              <WordCard
                key={index}
                data={value}
                dictId={dictData.id}
                deleteFuncAction={fetchDictData}
              />
            );
          })
        ) : (
          <p className={styles.message}>単語を追加しよう</p>
        )}
      </div>
    </div>
  );
}
