import React from 'react';
import styles from './TaskTypeIcon.module.scss';

interface ITaskTypeIcon {
  storyType: 'story' | 'task' | 'bug';
}

export default function TaskTypeIcon({ storyType }: ITaskTypeIcon) {
  const TYPE: Record<ITaskTypeIcon['storyType'], string> = {
    story:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
    task: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
    bug: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium'
  };

  return (
    <div className={styles.taskIcon}>
      <img src={TYPE[storyType]} alt={storyType} />
    </div>
  );
}
