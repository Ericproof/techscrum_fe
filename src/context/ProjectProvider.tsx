import React, { createContext, useCallback, useEffect, useState } from 'react';
import { getProjects } from '../api/projects/projects';
import { IProject } from '../types';

const ProjectContext = createContext<IProject[]>([]);
const ProjectDispatchContext = createContext<() => void>(() => {});

interface IProjectProvider {
  children?: React.ReactNode;
}

function ProjectProvider({ children }: IProjectProvider) {
  const [projectList, setProjectList] = useState<IProject[]>([]);

  const fetchProjectData = async () => {
    const res = await getProjects();
    if (!res.data) {
      return;
    }
    setProjectList(res.data);
  };

  const fetchProjects = useCallback(() => {
    fetchProjectData();
  }, []);

  useEffect(() => {
    fetchProjectData();
  }, []);

  return (
    <ProjectContext.Provider value={projectList}>
      <ProjectDispatchContext.Provider value={fetchProjects}>
        {children}
      </ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  );
}

ProjectProvider.defaultProps = {
  children: null
};

export { ProjectProvider, ProjectContext, ProjectDispatchContext };
