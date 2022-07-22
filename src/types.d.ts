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

export interface IShortcutData {
  [x: string]: any;
}

export interface ITaskData {
  [x: string]: any;
}

export interface ICardData {
  id?: string;
  tag?: string;
  title?: string;
  description?: string;
  poster?: string;
  assign?: string;
  dueAt?: Date;
  statusId?: string;
  label?: string;
  boardId?: string;
  projectId?: string;
}

export interface IProjectEditor {
  [key: string]: any;
}

export interface ILabelData {
  [key: string]: any;
}

export interface ILabel {
  id: string;
  name: string;
}

export interface IAssign {
  id?: string;
  email?: string;
  name?: string;
}

export interface ITaskRelator {
  id?: string;
  avatar?: string;
  name?: string;
}

export interface IItemFromBackend {
  id: string;
}
export interface ITaskCard {
  id?: string;
  tag?: string;
  title?: string;
  statusId?: string;
  assignInfo?: IAssign;
}

export interface IColumnsFromBackend {
  [statusId: string]: { name: string; items: ITaskCard[] };
}

export default interface IBoardEntity {
  id: string;
  title: string;
  taskStatus: [{ id: string; name: string }];
  taskList: {
    id: string;
    tag: string;
    title: string;
    statusId: string;
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

export interface IOnChangeTaskReporter {
  target: {
    id: string;
  };
}

export interface IOnChangeTaskAssignee {
  target: {
    id: string;
  };
}
export interface IUserInfo {
  id?: string;
  email?: string;
  name?: string;
  avatarIcon?: string;
  token?: string;
  refreshToken?: string;
}
