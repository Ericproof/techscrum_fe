export interface CreateCommit {
  taskId: string;
  senderId: string;
  content: string;
}
export interface UpdateCommit {
  commitId: string;
  content: string;
}
