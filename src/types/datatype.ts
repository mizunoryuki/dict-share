import { User } from "firebase/auth";

export interface DictInfo {
  id: string; //id
  title: string; //辞書名
  words: {
    name: string; //単語名
    discription: string; //説明
  }[];
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export interface DataWithUser {
  user: User | null;
  title: string;
}

export interface DictTitle {
  id: string;
  title: string;
}

export interface DictWord {
  name: string; //単語名
  discription: string; //説明
}

export interface Word {
	name:string;
	discription:string;
	wordId:string;
	date : Date;
}
