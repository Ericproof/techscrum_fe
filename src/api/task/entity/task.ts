import { ILabelData } from '../../../types';

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

export interface TaskEntity {
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
}
