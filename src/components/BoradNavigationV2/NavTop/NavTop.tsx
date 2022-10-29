/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';

import { AiOutlineCaretDown, AiOutlineCaretRight } from 'react-icons/ai';
import { IProjectData } from '../../../types';
import styles from './NavTop.module.scss';
import ProjectsDropdown from '../ProjectsDropdown/PropjectsDropdown';

interface IPropsNavTop {
  currentProject: IProjectData;
}

export default function NavTop(props: IPropsNavTop) {
  const { currentProject } = props;
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);

  // eslint-disable-next-line no-console
  console.log(currentProject);
  if (!currentProject) {
    return <></>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          src={
            currentProject.iconUrl ||
            'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10411?size=xxlarge'
          }
          alt="img"
        />
        <div className={styles.projectInfo}>
          <h2 className={styles.clearMargin}>{currentProject.name}</h2>
          <button
            onClick={() => {
              setShowProjectDropdown(!showProjectDropdown);
            }}
            className={styles.showDropdownBtn}
          >
            {showProjectDropdown ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />}
            <span>Software project</span>
          </button>
          {showProjectDropdown && (
            <ProjectsDropdown setShowProjectDropdown={setShowProjectDropdown} />
          )}
        </div>
      </div>
    </div>
  );
}
