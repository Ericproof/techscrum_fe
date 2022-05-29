export interface IMember {
  id: number;
  name: string;
}

export interface Iprops {
  cancelClick: () => void;
  addClick: (people: IMember) => void;
  memberList: IMember[];
}

export interface IRemove {
  removeClick: (id: number) => void;
  memberList: IMember[];
}
