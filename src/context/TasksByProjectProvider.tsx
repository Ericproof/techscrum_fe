import React, { createContext, useEffect, useState } from 'react';
import { getTasksByProject } from '../api/task/task';

const TasksByProjectContext = createContext<any>({});

interface IProviderProps {
  projectId: string;
  children?: React.ReactNode;
}

function TasksByProjectProvider({ projectId, children }: IProviderProps) {
  const [tasks, setTasks] = useState<any>([]);

  const fetchTasksByProject = async (id: string) => {
    const res = await getTasksByProject(id);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasksByProject(projectId);
  }, [projectId]);

  return <TasksByProjectContext.Provider value={tasks}>{children}</TasksByProjectContext.Provider>;
}

TasksByProjectProvider.defaultProps = {
  children: null
};

export { TasksByProjectContext, TasksByProjectProvider };
