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
  tags?: [ILabelData];
  title?: string;
  statusId?: string;
  typeId?: string;
  description?: string;
  storyPoint?: number;
  dueAt?: Date | string;
  assignInfo?: IAssign;
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
  tags?: [ILabelData];
  title?: string;
  statusId?: string;
  typeId?: string;
  description?: string;
  storyPoint?: number;
  dueAt?: Date | string;
  assignee?: IAssign;
}

export interface IColumnsFromBackend {
  [statusId: string]: { name: string; items: ITaskCard[] };
}

export interface IStatusEntity {
  id: string;
  slug: string;
  name: string;
  order: string;
  taskList: ITaskCard[];
}

export default interface IBoardEntity {
  id: string;
  title: string;
  taskStatus: IStatusEntity[];
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

export interface IPermissions {
  id?: string;
  slug?: string;
  description?: string;
}

export interface ICommentData {
  [x: string]: any;
}

export interface ICommentItemData {
  [x: string]: any;
}

export interface IResetPasswordForm {
  email: stirng;
}

export interface IConfig {
  [x: string]: any;
}
