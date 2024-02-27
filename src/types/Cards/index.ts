import { ITag } from "../Tags";

export interface IReference {
  type: "text" | "link" | "youtube";
  text?: string;
  url?: string;
  videoID?: string;
  timestampSeconds?: string;
  _id?: string;
}

export interface ICardForm {
  groupId?: string;
  question: string;
  answer: string;
  references?: IReference[];
  tags?: ITag[];
}

export interface ICard {
  _id: string;
  groupId: string;
  question: string;
  answer: string;
  references?: IReference[];
  tags?: ITag[];
}
