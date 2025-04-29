import { useState, useCallback } from "react";
import { DictTitle } from "@/types/datatype";

interface dictsData {
  dictionaries: DictTitle[];
}
export function useDictTitle(userId: string | undefined) {
  const [dicts, setDicts] = useState<dictsData>({
    dictionaries: [{ id: "", title: "" }],
  });

  const fetchDicts = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await fetch(`/api/dictionaries?userId=${userId}`);
      const data = await response.json();
      if (!data.error) {
        setDicts({ dictionaries: data.dictionaries });
      }
    } catch (e) {
      console.error(e);
    }
  }, [userId]);

  return { dicts, fetchDicts };
}
