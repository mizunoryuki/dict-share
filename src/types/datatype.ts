import { User } from "firebase/auth";

export interface DictInfo {
  title: string; //辞書名
  words: {
    name: string; //単語名
    discription: string; //説明
  };
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export interface DataWithUser {
  user: User | null;
  title: string;
}
