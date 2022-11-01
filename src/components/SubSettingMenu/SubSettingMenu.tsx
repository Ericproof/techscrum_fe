import React, { useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { BsBriefcase, BsCreditCard } from 'react-icons/bs';
import { AiOutlineSetting, AiOutlineUnorderedList } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { IProject, IProjectData } from '../../types';

import { ProjectContext } from '../../context/ProjectProvider';
import styles from './SubSettingMenu.module.scss';

export default function SubSettingMenu() {
  const { boardId = '', projectId = '' } = useParams();
  const projectList = useContext<IProject[]>(ProjectContext);
  const currentProject: IProjectData = projectList.filter(
    (project: IProjectData) => project.id === projectId
  )[0];

  const buttons = {
    planning: [
      {
        name: 'User Profile',
        url: `/projects/${projectId}/board/${boardId}`,
        icon: <CgProfile />,
        dataTestId: 'user-profile'
      },
      {
        name: 'Preference',
        url: `/projects/${projectId}/board/${boardId}/backlog`,
        icon: <AiOutlineSetting />,
        dataTestId: 'preference'
      }
    ],
    utilBtns: [
      {
        name: 'Company Details',
        checkAccess: 'view:members',
        url: `/projects/${currentProject?.id}/members`,
        icon: <BsBriefcase />,
        dataTestId: 'company-details'
      },
      {
        name: 'Plan & Billing',
        checkAccess: 'view:settings',
        url: `/settings/${currentProject?.id}`,
        icon: <BsCreditCard />,
        dataTestId: 'plan-and-billing'
      }
    ],
    dailyScrumBtn: [
      {
        name: '(WIP)Custom Fields',
        showDailyScrumFunction: () => {},
        icon: <AiOutlineUnorderedList />,
        dataTestId: 'custom-fields'
      }
    ]
  };

  const renderList = (item: string) => {
    return buttons[item].map((btn) => {
      return (
        <NavLink
          end
          to={btn.url}
          data-testid={btn.dataTestId}
          className={styles.navBtn}
          key={btn.name}
        >
          {btn.icon}
          <span>{btn.name}</span>
        </NavLink>
      );
    });
  };

  const renderLine = (index: number) => {
    return index !== Object.keys(buttons).length - 1 && <div className={styles.dividingLine} />;
  };

  return (
    <nav className={styles.container}>
      <h1 className={styles.header}>Settings</h1>
      {Object.keys(buttons).map((item, index) => {
        return (
          <div className={styles.section} key={item}>
            {renderList(item)}
            {renderLine(index)}
          </div>
        );
      })}
    </nav>
  );
}
