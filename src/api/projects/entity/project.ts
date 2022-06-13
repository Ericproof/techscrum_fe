export default interface Project{
    id: number;
  name: string;
  key: string;
  leader: { userId: number; userName: string; userIcon: string };
  assign: { userId: string; userName: string; userIcon: string };
 }