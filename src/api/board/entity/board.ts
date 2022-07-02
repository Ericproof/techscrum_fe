export default interface BoardEntity {
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
