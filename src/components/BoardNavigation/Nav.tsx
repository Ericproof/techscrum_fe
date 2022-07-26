import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContext, ProjectDispatchContext } from '../../context/ProjectProvider';
import NavBottom from './NavBottom/NavBottom';
import NavMain from './NavMain/NavMain';
import NavTop from './NavTop/NavTop';
import style from './Nav.module.scss';
import { IProject, IProjectData } from '../../types';

export default function Nav() {
  const { projectId = '' } = useParams();
  const projectList = useContext<IProject[]>(ProjectContext);
  const fetchProjects = useContext(ProjectDispatchContext);
  const currentProject: IProjectData[] = projectList.filter(
    (project: IProjectData) => project.id === projectId
  );

  const fetchProjectsList = () => {
    fetchProjects();
  };

  return (
    <nav className={style.container}>
      <NavTop currentProject={currentProject[0]} />
      <NavMain
        currentProject={currentProject[0]}
        shortCutAdded={fetchProjectsList}
        shortCutRemoved={fetchProjectsList}
        shortCutUpdated={fetchProjectsList}
      />
    </nav>
  );
}
