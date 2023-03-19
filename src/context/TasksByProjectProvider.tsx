import React, { createContext, useEffect, useState, useMemo } from 'react';
import { getTasksByProject } from '../api/task/task';

const TasksByProjectContext = createContext<any>({});

interface IProviderProps {
  projectId: string;
  children?: React.ReactNode;
  backlogData?: any;
}

function TasksByProjectProvider({ projectId, backlogData, children }: IProviderProps) {
  const [tasks, setTasks] = useState<any>([]);

  const a = useMemo(() => backlogData, [backlogData]);

  const fetchTasksByProject = async (id: string) => {
    const res = await getTasksByProject(id);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasksByProject(projectId);
  }, [projectId, a]);

  return <TasksByProjectContext.Provider value={tasks}>{children}</TasksByProjectContext.Provider>;
}

TasksByProjectProvider.defaultProps = {
  children: null,
  backlogData: null
};

export { TasksByProjectContext, TasksByProjectProvider };
