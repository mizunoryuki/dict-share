import { useState, useCallback } from "react";

interface Word {
  name: string;
  discription: string;
  wordId: string;
  date: Date;
}

interface DictData {
  id: string;
  dictName: string;
  words: Word[];
}

export function useDictData(
  userId: string | undefined,
  dictId: string | undefined
) {
  const [dictData, setDictData] = useState<DictData>({
    id: "",
    dictName: "",
    words: [],
  });

  const fetchDictData = useCallback(async () => {
    if (!userId || !dictId) return;

    try {
      const response = await fetch(
        `/api/dictionaries/single?userId=${userId}&dictId=${dictId}`
      );
      const data = await response.json();
      if (!data.error) {
        setDictData({ id: dictId, ...data });
      }
    } catch (e) {
      console.error(e);
    }
  }, [userId, dictId]);

  return { dictData, fetchDictData };
}
