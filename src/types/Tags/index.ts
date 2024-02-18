export interface ITag {
  _id: string;
  name: string;
  description?: string;
  groupId: string;
}

export interface ITagForm {
  name: string;
  description?: string;
  groupId?: string;
}
