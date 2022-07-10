export interface IProject {
  id: number;
  name: string;
  icon: string;
  type: string;
  star: boolean;
  lastEditTime: Date;
}

export interface IProjectData {
  [x: string]: any;
}

export interface ITaskData {
  [x: string]: any;
}

export interface ICardData {
  [key: string]: any;
}

export interface IProjectEditor {
  [key: string]: any;
}

export interface IAssign {
  id?: string;
  email?: string;
  name?: string;
}

export interface IItemFromBackend {
  id: string;
  tag?: string;
  title?: string;
  statusId?: number;
  assignInfo?: IAssign;
}

export interface IColumnsFromBackend {
  [statusId: string]: { name: string; items: IItemFromBackend[] };
}

export default interface IBoardEntity {
  id: string;
  title: string;
  taskStatus: [string];
  taskList: {
    id: string;
    tag: string;
    title: string;
    statusId: number;
    assignInfo: {
      id: string;
      email: string;
      name: string;
    };
  }[];
}

export interface IOnChangeTaskStatus {
  target: {
    status: string;
  };
}

export interface IOnChangeProjectLead {
  target: {
    name: string;
    value: string;
  };
}

export interface IOnChangeAssignee {
  target: {
    name: string;
    value: string;
  };
}
