import React, { createContext, useEffect, useState } from 'react';
import { getProjects } from '../api/projects/projects';
import { IProject } from '../types';

const ProjectContext = createContext<IProject[]>([]);

interface IProjectProvider {
  children: any;
}

function ProjectProvider({ children }: IProjectProvider) {
  const [projectList, setProjectList] = useState<IProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getProjects();
      if (!res.data) {
        return;
      }
      setProjectList(res.data);
    };
    fetchProjects();
  }, []);

  return <ProjectContext.Provider value={projectList}>{children}</ProjectContext.Provider>;
}

export { ProjectProvider, ProjectContext };
