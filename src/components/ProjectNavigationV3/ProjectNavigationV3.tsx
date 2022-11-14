/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { HiViewBoards } from 'react-icons/hi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { IoMdList } from 'react-icons/io';
import { FaDailymotion } from 'react-icons/fa';
import ReactDOM from 'react-dom';
import { VscNewFile } from 'react-icons/vsc';
import { IProject, IProjectData, IShortcutData } from '../../types';
import { ProjectContext, ProjectDispatchContext } from '../../context/ProjectProvider';
import styles from './ProjectNavigationV3.module.scss';
import DailyScrum from '../DailyScrum/DailyScrum';
import ShortcutModal from '../ShortcutModal/ShortcutModal';
import Modal from '../Modal/Modal';
import addshorcut from '../../assets/addshorcut.svg';
import DefaultModalHeader from '../Modal/ModalHeader/DefaultModalHeader/DefaultModalHeader';
import checkAccess from '../../utils/helpers';

interface IItem {
  name: string;
  icon: React.ReactNode;
  dataTestId: string;
  url?: string;
  checkAccess?: string;
  action?: () => void;
}

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDailyScrum, setShowDailyScrum] = useState(false);
  const [operation] = useState('');
  const [selectedLink] = useState<IShortcutData | null>(null);
  const [addLinkToggle, setAddLinkToggle] = useState(false);
  const { projectId = '' } = useParams();
  const projectList = useContext<IProject[]>(ProjectContext);
  const fetchProjects = useContext(ProjectDispatchContext);
  const currentProject: IProjectData = projectList.filter(
    (project: IProjectData) => project.id === projectId
  )[0];

  if (!currentProject) {
    return (
      <div id="projectDropdownNav">
        <nav className={styles.container} />
      </div>
    );
  }

  const { boardId } = currentProject;

  const buttons = [
    {
      name: 'Board',
      url: `/projects/${projectId}/board/${boardId}`,
      icon: <HiViewBoards />,
      dataTestId: 'board-btn'
    },
    {
      name: 'Backlog',
      url: `/projects/${projectId}/board/${boardId}/backlog`,
      icon: <IoMdList />,
      dataTestId: 'backlog-btn'
    },
    {
      name: 'Daily scrum',
      icon: <FaDailymotion />,
      action: () => {
        setShowDailyScrum(true);
      },
      dataTestId: 'dailyscrum-btn'
    },
    {
      name: 'Members',
      checkAccess: 'view:members',
      url: `/projects/${currentProject?.id}/members`,
      icon: <BsFillPeopleFill />,
      dataTestId: 'member-btn'
    },
    {
      name: 'Settings',
      checkAccess: 'view:settings',
      url: `/settings/${currentProject?.id}`,
      icon: <FiSettings />,
      dataTestId: 'project-settings-btn'
    },
    {
      name: 'Shortcut',
      checkAccess: 'add:shortcut',
      action: () => {
        setAddLinkToggle(true);
      },
      icon: <VscNewFile />,
      dataTestId: 'shortcut-btn'
    }
  ];

  const renderBtn = (item: IItem) => {
    console.log(location.pathname, item.url, location.pathname === item.url);
    return (
      <button
        data-testid={item.dataTestId}
        className={[styles.navBtn].join(' ')}
        onClick={() => {
          if (item.url) {
            navigate(item.url);
          }
          if (item.action) {
            item.action();
          }
        }}
        key={item.name}
      >
        {item.icon}
        <span>{item.name}</span>
      </button>
    );
  };

  const renderMenu = () => {
    return (
      <ul className={styles.menu}>
        {buttons.map((item) => {
          if (!checkAccess(item.checkAccess, projectId)) {
            return <></>;
          }
          return (
            <li
              className={[
                styles.menuItem,
                location.pathname === item.url ? styles.active : ''
              ].join(' ')}
              key={item.name}
            >
              {renderBtn(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderModals = () => {
    return (
      <>
        {showDailyScrum && (
          <DailyScrum
            onClickCloseModal={() => {
              setShowDailyScrum(false);
            }}
            projectId={currentProject?.id}
          />
        )}
        {addLinkToggle &&
          ReactDOM.createPortal(
            <Modal classesName={[styles.shortcutModal, 'clear'].join(' ')}>
              <DefaultModalHeader
                title="Shortcut"
                onClickClose={() => {
                  setAddLinkToggle(false);
                }}
              />
              <img src={addshorcut} alt="shortcut" className={styles.shortcutImg} />
              <ShortcutModal
                operation={operation}
                setAddLinkToggle={setAddLinkToggle}
                addLinkToggle={addLinkToggle}
                selectedLink={selectedLink}
                currentProjectId={currentProject?.id}
                shortCutAdded={() => {
                  setAddLinkToggle(false);
                  fetchProjects();
                }}
                shortCutUpdated={fetchProjects}
                shortCutRemoved={() => {
                  setAddLinkToggle(false);
                  fetchProjects();
                }}
              />
            </Modal>,
            document.body
          )}
      </>
    );
  };

  return (
    <div>
      {renderMenu()}
      {renderModals()}
    </div>
  );
}
