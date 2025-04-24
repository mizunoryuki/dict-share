"use client";
import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
interface Data {
  dictName: string;
  words: {
    name: string;
    discription: string;
    wordId: string;
    date: Date;
  }[];
}

export default function SharePage() {
  const searchParams = useSearchParams();
  const dictId = searchParams.get("id");
  const [dictData, setDictData] = useState<Data>({ dictName: "", words: [] });
  const [isError, setIsError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");

  useEffect(() => {
    if (dictId) {
      const fetchData = async (dictId: string) => {
        try {
          await fetch(`/api/share-dict?dictId=${dictId}`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.error) {
                setIsError(true);
                setErrorText(data.error);
              } else {
                setDictData(data);
              }
            });
        } catch (error) {
          console.log(error);
          setIsError(true);
        }
      };
      fetchData(dictId);
    }
  }, [dictId]);

  return (
    <div>
      <Header isHide={false} />
      {isError ? (
        <div>
          <p>{errorText}</p>
        </div>
      ) : (
        <div>
          <div>{dictId}</div>
          <p>タイトル:{dictData.dictName}</p>
          <div>
            {dictData.words && dictData.words.length > 0 ? (
              dictData.words.map((value, index) => {
                return (
                  <div key={index}>
                    <p>name :{value.name}</p>
                    <p>disription :{value.discription}</p>
                  </div>
                );
              })
            ) : (
              <p>単語なし</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
