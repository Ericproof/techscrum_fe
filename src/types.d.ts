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
  title: string;
  statusId?: any;
  typeId?: string;
  description?: string;
  storyPoint?: number;
  dueAt?: Date | string;
  assignInfo?: IAssign;
  label?: string;
  boardId?: string;
  projectId?: string;
}

export interface ITaskEntity {
  status?: any;
  id?: string;
  title?: string;
  tags?: ILabelData[];
  statusId?: string;
  projectId?: string;
  boardId?: string;
  typeId?: any;
  description?: string;
  storyPoint?: number;
  dueAt?: Date;
  assignId?: string;
  reporterId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: any;
  attachmentUrls?: any;
  slug?: any;
}

export interface Task {
  title: string;
  description: string;
  cardType: string;
  assignId: { userId: string; userName: string; userIcon: string };
  label: string;
  sprint: string;
  storyPointEstimate: string;
  pullRequestNumber: number;
  reporter: { userId: string; userName: string; userIcon: string };
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
  title: string;
  statusId?: string;
  typeId?: string;
  description?: string;
  storyPoint?: number;
  dueAt?: Date | string;
  assignee?: IAssign;
}

export interface IColumnsFromBackend {
  [statusId: string]: {
    name: string;
    slug: string;
    order: number;
    items: ITaskCard[];
  };
}

export interface IStatusEntity {
  id: string;
  slug: string;
  name: string;
  order: number;
  taskList: ITaskCard[];
}
export interface IStatusBacklog {
  id: string;
  slug: string;
  name: string;
  order: number;
  board: string;
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

export interface IActivityData {
  [x: string]: any;
}
export interface IActivityItemData {
  [x: string]: any;
}

export interface IResetPasswordForm {
  email: stirng;
}

export interface IConfig {
  [x: string]: any;
}

export interface Itypes {
  slug: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IOptions {
  label: string;
  value: any;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  userInfo?: IUserInfo;
}
