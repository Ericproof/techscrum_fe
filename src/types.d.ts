export interface IProject {
  id: string;
  name: string;
  iconUrl: string;
  star: boolean;
  type?: string;
  boardId?: string;
  projectLeadId?: IUserInfo;
  updateAt: Date;
}

export interface IProjectData {
  [x: string]: any;
}

export interface IShortcutData {
  id?: string;
  name?: string;
  shortcutLink?: string;
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
  assignId?: string;
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
  id?: string;
  name?: string;
  slug?: string;
}

export interface IAssign {
  id?: string;
  email?: string;
  name?: string;
  avatarIcon?: string;
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
  typeId?: string;
  description?: string;
  storyPoint?: number;
  dueAt?: Date;
  assignInfo?: IAssign;
}

export interface IColumnsFromBackend {
  [statusId: string]: { name: string; items: ITaskCard[] };
}

export default interface IBoardEntity {
  id: string;
  title: string;
  taskStatus: [
    { id: string; name: string; slug: string; items: [{ taskId: string; order: number }] }
  ];
  taskList: [ITaskCard[]];
}

export interface IOnChangeTaskStatus {
  target: {
    status: string | null;
  };
}

export interface IOnChangeProjectLead {
  target: {
    name: string;
    value: string | null;
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

export interface IProjectRole {
  id?: string;
  projectId: string;
  roleId: string;
}

export interface IUserInfo {
  id?: string;
  email?: string;
  name?: string;
  avatarIcon?: string;
  token?: string;
  refreshToken?: string;
  abbreviation?: string;
  userName?: string;
  jobTitle?: string;
  location?: string;
  projectsRoles?: [IProjectRole];
}

export interface IPermission {
  id?: string;
  slug?: string;
  description?: string;
}

export interface IRole {
  id?: string;
  name?: string;
  slug?: string;
  permission?: IPermission[];
}

export interface ICommentData {
  [x: string]: any;
}

export interface ICommentItemData {
  [x: string]: any;
}
