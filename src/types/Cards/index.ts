import { ITag } from '../Tags';

export interface ICardForm {
  groupId?: string;
  question: string;
  answer: string;
  reference?: string;
  tags?: ITag[];
}

export interface ICard {
  _id: string;
  groupId: string;
  question: string;
  answer: string;
  reference?: string;
  tags?: ITag[];
}
