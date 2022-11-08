import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import styles from './NavigationV2.module.scss';
import checkAccess from '../../utils/helpers';
import DailyScrum from '../DailyScrum/DailyScrum';
import ShortcutModal from '../ShortcutModal/ShortcutModal';

interface IItem {
  name: string;
  url: string | null;
  checkAccess: string | null;
  icon: React.ReactNode;
  dataTestId: string;
}
export default function Nav() {
  const navigate = useNavigate();
  const [showDailyScrum, setShowDailyScrum] = useState(false);
  const [operation, setOperation] = useState('');
  const [selectedLink, setSelectedLink] = useState<IShortcutData | null>(null);
  const [addLinkToggle, setAddLinkToggle] = useState(false);
  const { boardId = '', projectId = '' } = useParams();
  const [showBtns, setShowBtns] = useState({
    planning: true,
    tracking: true,
    shortcuts: true,
    utility: true
  });
  const projectList = useContext<IProject[]>(ProjectContext);
  const fetchProjects = useContext(ProjectDispatchContext);
  const currentProject: IProjectData = projectList.filter(
    (project: IProjectData) => project.id === projectId
  )[0];

  const buttons = {
    planning: [
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
    ],
    tracking: [
      {
        name: 'Daily scrum',
        icon: <FaDailymotion />,
        dataTestId: 'dailyscrum-btn'
      }
    ],
    utility: [
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
    ]
  };

  const setShowBtnState = (category: string) => {
    setShowBtns({ ...showBtns, [category]: !showBtns[category] });
  };

  const renderCategoryBtn = (categoryType: string) => {
    return (
      <button
        className={styles.category}
        onClick={() => {
          setShowBtnState(categoryType);
        }}
      >
        <span>{showBtns[categoryType] ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />}</span>
        {categoryType.toUpperCase()}
      </button>
    );
  };

  const renderBtn = (item: IItem) => {
    return (
      <button
        data-testid={item.dataTestId}
        className={styles.navBtn}
        onClick={() => {
          if (item.url) {
            navigate(item.url);
          } else {
            setShowDailyScrum(true);
          }
        }}
        key={item.name}
      >
        {item.icon}
        <span>{item.name}</span>
      </button>
    );
  };

  return (
    <>
      <div id="projectDropdownNav" />
      <nav className={styles.container}>
        <ProjectHeaderNav currentProject={currentProject} />
        {Object.keys(buttons).map((category) => {
          return (
            <>
              <div className={styles.section} key={category}>
                {renderCategoryBtn(category)}
                {showBtns[category] &&
                  buttons[category].map((item: IItem) => {
                    return renderBtn(item);
                  })}
              </div>
              <div className={styles.dividingLine} />
            </>
          );
        })}

        {showDailyScrum && (
          <DailyScrum
            onClickCloseModal={() => {
              setShowDailyScrum(false);
            }}
            projectId={currentProject?.id}
          />
        )}

        <div className={styles.section}>
          <button
            className={styles.category}
            onClick={() => {
              setShowBtnState('shortcuts');
            }}
          >
            <span>{showBtns.shortcuts ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />}</span>
            SHORTCUTS
          </button>
          {showBtns.shortcuts &&
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
                    className={styles.navBtn}
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
          {showBtns.shortcuts && checkAccess('add:shortcut', projectId) && (
            <button
              className={styles.navBtn}
              type="button"
              onClick={() => {
                setAddLinkToggle(!addLinkToggle);
                setOperation('Add');
                setSelectedLink(null);
              }}
              data-testid="add-shortcut"
            >
              <VscNewFile />
              <span>Add shortcut (WIP)</span>
            </button>
          )}
          {addLinkToggle && (
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
          )}
        </div>
      </nav>
    </>
  );
}
