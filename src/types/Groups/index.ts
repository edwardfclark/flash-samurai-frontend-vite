export interface IGroupForm {
  name: string;
  description?: string;
}

export interface IGroup {
  _id: string;
  name: string;
  description?: string;
  owner: string;
}
