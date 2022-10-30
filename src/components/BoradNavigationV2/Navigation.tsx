import React, { useContext, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { RiPencilLine } from 'react-icons/ri';
import { HiViewBoards } from 'react-icons/hi';
import { VscNewFile } from 'react-icons/vsc';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { IoMdList } from 'react-icons/io';
import { FaDailymotion } from 'react-icons/fa';
import { AiOutlineCaretDown, AiOutlineCaretRight, AiOutlineLink } from 'react-icons/ai';
import { IProject, IProjectData, IShortcutData } from '../../types';
import ProjectHeaderNav from './ProjectHeaderNav/ProjectHeaderNav';
import { ProjectContext, ProjectDispatchContext } from '../../context/ProjectProvider';
import styles from './Navigation.module.scss';
import checkAccess from '../../utils/helpers';
import Shortcut from '../AddShortcut/Shortcut';
import DailyScrum from '../DailyScrum/DailyScrum';

export default function Nav() {
  const [showDailyScrum, setShowDailyScrum] = useState(false);
  const [operation, setOperation] = useState('');
  const [selectedLink, setSelectedLink] = useState<IShortcutData | null>(null);
  const [addLinkToggle, setAddLinkToggle] = useState(false);
  const { boardId = '', projectId = '' } = useParams();
  const [showPlanning, setShowPlanning] = useState(true);
  const [showTracking, setShowTracking] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(true);
  const projectList = useContext<IProject[]>(ProjectContext);
  const fetchProjects = useContext(ProjectDispatchContext);
  const currentProject: IProjectData = projectList.filter(
    (project: IProjectData) => project.id === projectId
  )[0];

  const planningBtns = [
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
    }
  ];
  const utilBtns = [
    {
      name: 'Members',
      checkAccess: 'view:members',
      url: `/projects/${currentProject?.id}/members`,
      icon: <BsFillPeopleFill />,
      dataTestId: 'member-btn'
    },
    {
      name: 'Project Settings',
      checkAccess: 'view:settings',
      url: `/settings/${currentProject?.id}`,
      icon: <FiSettings />,
      dataTestId: 'project-settings-btn'
    }
  ];

  return (
    <nav className={styles.container}>
      <ProjectHeaderNav currentProject={currentProject} />
      <div className={styles.planning}>
        <button
          className={styles.category}
          onClick={() => {
            setShowPlanning(!showPlanning);
          }}
        >
          <span>{showPlanning ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />}</span>
          PLANNING
        </button>
        {showPlanning &&
          planningBtns.map((btn) => {
            return (
              <NavLink end to={btn.url} data-testid={btn.dataTestId}>
                {btn.icon}
                <span>{btn.name}</span>
              </NavLink>
            );
          })}
      </div>

      <div className={styles.dividingLine} />

      <div className={styles.tracking}>
        <button
          className={styles.category}
          onClick={() => {
            setShowTracking(!showTracking);
          }}
        >
          <span>{showTracking ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />}</span>
          TRACKING
        </button>
        {showTracking && (
          <button
            onClick={() => {
              setShowDailyScrum(true);
            }}
            className={styles.dailyScrumBtn}
            data-testid="dailyscrum-btn"
          >
            <FaDailymotion className={styles.dailyScrumIcon} />
            <span>Daily scrum</span>
          </button>
        )}

        {showDailyScrum && (
          <DailyScrum
            onClickCloseModal={() => {
              setShowDailyScrum(false);
            }}
          />
        )}
      </div>

      <div className={styles.dividingLine} />

      <div className={styles.shortcuts}>
        <button
          className={styles.category}
          onClick={() => {
            setShowShortcuts(!showShortcuts);
          }}
        >
          <span>{showShortcuts ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />}</span>
          SHORTCUTS
        </button>
        {showShortcuts &&
          currentProject?.shortcut.map((shortcutData: IShortcutData) => {
            return (
              <React.Fragment key={shortcutData.id}>
                <a
                  href={
                    shortcutData.shortcutLink && shortcutData.shortcutLink.includes('https://')
                      ? shortcutData.shortcutLink
                      : `https://${shortcutData.shortcutLink}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`shortcut-${shortcutData.id}`}
                >
                  <AiOutlineLink />
                  <span className={styles.shortcutContent}>{shortcutData.name}</span>
                  {checkAccess('add:shortcut', projectId) && (
                    <button
                      type="button"
                      className={styles.pencil}
                      onClick={(e) => {
                        e.preventDefault();
                        setAddLinkToggle(!addLinkToggle);
                        setOperation('Edit');
                        setSelectedLink(shortcutData);
                      }}
                    >
                      <RiPencilLine className={styles.pencilLine} />
                    </button>
                  )}
                </a>
              </React.Fragment>
            );
          })}
        {showShortcuts && checkAccess('add:shortcut', projectId) && (
          <button
            className={styles.addShortcut}
            type="button"
            onClick={() => {
              setAddLinkToggle(!addLinkToggle);
              setOperation('Add');
              setSelectedLink(null);
            }}
            data-testid="add-shortcut"
          >
            <VscNewFile />
            <span>Add shortcut</span>
          </button>
        )}
        {addLinkToggle && (
          <Shortcut
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
        )}
      </div>
      <div className={styles.dividingLine} />

      <div className={styles.utils}>
        {utilBtns.map((btn) => {
          return (
            checkAccess(btn.checkAccess, projectId) && (
              <NavLink to={btn.url} data-testid={btn.dataTestId}>
                {btn.icon}
                <span>{btn.name}</span>
              </NavLink>
            )
          );
        })}
      </div>
    </nav>
  );
}
