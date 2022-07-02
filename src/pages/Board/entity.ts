export interface Assign {
  id?: string;
  email?: string;
  name?: string;
}

export interface ItemFromBackend {
  id: string;
  tag: string;
  title: string;
  statusId: number;
  assignInfo?: Assign;
}

export interface ColumnsFromBackend {
  [x: string]: { name: string; items: ItemFromBackend[] };
}
