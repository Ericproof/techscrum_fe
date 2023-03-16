interface IBacklogData {
  backlog: {
    cards: [
      {
        id: string;
        createdAt: string;
      }
    ];
  };
  sprints: [
    {
      taskId: [
        {
          id: string;
          createdAt: string;
        }
      ];
    }
  ];
}

export type ITasksByProject = { id: string; createdAt: string }[];

export const getTasksByProject = (backlogData: IBacklogData) => {
  const sprintTasks = backlogData.sprints.flatMap((sprint) => sprint.taskId);
  const tasksBacklog = backlogData.backlog.cards
    .map((task) => ({ id: task.id, createdAt: task.createdAt }))
    .concat(sprintTasks.map((task) => ({ id: task.id, createdAt: task.createdAt })))
    .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
  return tasksBacklog;
};
