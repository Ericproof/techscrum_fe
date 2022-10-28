import React, { useState } from 'react';
import { RiPencilFill, RiPencilLine } from 'react-icons/ri';
import { HiViewBoards } from 'react-icons/hi';
import { VscNewFile } from 'react-icons/vsc';
import { NavLink, useParams } from 'react-router-dom';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { IoMdList } from 'react-icons/io';
import { FaDailymotion } from 'react-icons/fa';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { IProjectData, IShortcutData } from '../../../types';
import checkAccess from '../../../utils/helpers';
import Shortcut from '../../AddShortcut/Shortcut';
import styles from './NavMain.module.scss';
import DailyScrum from '../../DailyScrum/DailyScrum';

interface IPropsNavMain {
  currentProject: IProjectData;
  shortCutAdded: () => void;
  shortCutRemoved: () => void;
  shortCutUpdated: () => void;
}

export default function NavMain(props: IPropsNavMain) {
  const [showDailyScrum, setShowDailyScrum] = useState(false);
  const [operation, setOperation] = useState('');
  const [selectedLink, setSelectedLink] = useState<IShortcutData | null>(null);

  const [addLinkToggle, setAddLinkToggle] = useState(false);
  const { boardId = '', projectId = '' } = useParams();

  const { currentProject, shortCutAdded, shortCutRemoved, shortCutUpdated } = props;
  return (
    <>
      <div className={styles.containerTop}>
        <p>
          <span>
            <AiOutlineCaretDown />
          </span>
          PLANNING
        </p>
        <NavLink end to={`/projects/${projectId}/board/${boardId}`} data-testid="board-btn">
          <HiViewBoards />
          <span>Board</span>
        </NavLink>
        <NavLink
          end
          to={`/projects/${projectId}/board/${boardId}/backlog`}
          data-testid="backlog-btn"
        >
          <IoMdList />
          <span>Backlog</span>
        </NavLink>
      </div>

      <div className={styles.dividingLine} />

      <div className={styles.containerBottom}>
        <p>
          <span>
            <AiOutlineCaretDown />
          </span>
          TRACKING
        </p>
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
        {showDailyScrum && (
          <DailyScrum
            onClickCloseModal={() => {
              setShowDailyScrum(false);
            }}
          />
        )}

        <p>
          <span>
            <AiOutlineCaretDown />
          </span>
          SHORTCUTS
        </p>
        {currentProject?.shortcut.map((shortcutData: IShortcutData) => {
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
                <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
                  <g fill="currentColor">
                    <path d="M19.005 19c-.003 0-.005.002-.005.002l.005-.002zM5 19.006c0-.004-.002-.006-.005-.006H5v.006zM5 4.994V5v-.006zM19 19v-6h2v6.002A1.996 1.996 0 0119.005 21H4.995A1.996 1.996 0 013 19.006V4.994C3 3.893 3.896 3 4.997 3H11v2H5v14h14zM5 4.994V5v-.006zm0 14.012c0-.004-.002-.006-.005-.006H5v.006zM11 5H5v14h14v-6h2v6.002A1.996 1.996 0 0119.005 21H4.995A1.996 1.996 0 013 19.006V4.994C3 3.893 3.896 3 4.997 3H11v2zm8 0v3a1 1 0 002 0V4a1 1 0 00-1-1h-4a1 1 0 000 2h3z" />
                    <path d="M12.707 12.707l8-8a1 1 0 10-1.414-1.414l-8 8a1 1 0 001.414 1.414z" />
                  </g>
                </svg>
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
                    <RiPencilFill className={styles.pencilFill} />
                  </button>
                )}
              </a>
            </React.Fragment>
          );
        })}
        {checkAccess('add:shortcut', projectId) && (
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
              shortCutAdded();
            }}
            shortCutUpdated={shortCutUpdated}
            shortCutRemoved={() => {
              setAddLinkToggle(false);
              shortCutRemoved();
            }}
          />
        )}
        <div className={styles.positionBottom}>
          {checkAccess('view:members', projectId) && (
            <NavLink to={`/projects/${currentProject?.id}/members`}>
              <BsFillPeopleFill />
              <span>Members</span>
            </NavLink>
          )}
          {checkAccess('view:settings', projectId) && (
            <NavLink to={`/settings/${currentProject?.id}`} className={styles.projectSettings}>
              <FiSettings />
              <span>Project Settings</span>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}
