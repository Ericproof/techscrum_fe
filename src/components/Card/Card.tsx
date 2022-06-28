import React, { useState } from 'react';
import styles from './Card.module.scss';
import { createNewTask } from '../../api/task/task';

interface CreateCardProps {
  onCompletedSubmit?: (res: any) => void;
}

const Cancel = () => {
  window.opener = null;
  window.open('', '_self');
  window.close();
};

function Card(props: CreateCardProps) {
  const [data, setData] = useState<any>({
    title: '',
    description: '',
    cardType: '',
    assign: { userId: '', userName: '', userIcon: '' },
    label: '',
    sprint: '',
    storyPointEstimate: '',
    pullRequestNumber: 0,
    reporter: { userId: '', userName: '', userIcon: '' }
  });
  const [hasError, setError] = useState(false);
  const { onCompletedSubmit = null } = props;

  const onSave = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createNewTask(data)
      .then((res: any) => {
        if (!res.data) {
          return;
        }
        setError(false);
        if (onCompletedSubmit) {
          onCompletedSubmit(res);
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTitle}>
        <h2 className={styles.titleContent}>Create card</h2>
        <button type="button" className={styles.titleButton}>
          ...
        </button>
      </div>
      <form>
        <div className={styles.cardContent}>
          <p className={styles.cardStar}>Project</p>
          <input className={styles.cardInput} disabled defaultValue="TECHSCRUM(TEC)" />
          <p className={styles.cardStar}>Card type</p>
          <select className={styles.cardSelect}>
            <option value="story">Story</option>
            <option value="bug">Bug</option>
          </select>
          <p className={styles.cardStar}>Summary</p>
          <input className={styles.cardInput} type="text" />
          <p className={styles.cardLabel}>Attachment</p>
          <input
            className={styles.cardInput}
            type="file multiple"
            id="fileInput"
            placeholder="Drop files to attach or browse"
          />
          <p className={styles.cardLabel}>Description</p>
          <textarea className={styles.cardTextarea} />
          <p className={styles.cardLabel}>Assignee</p>
          <input className={styles.cardAssignee} placeholder="Automatic" />
          <p className={styles.cardLabel} style={{ display: 'none' }}>
            Priority
          </p>
          <select className={styles.cardSelect} style={{ display: 'none' }}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <p className={styles.cardLabel} style={{ display: 'none' }}>
            Labels
          </p>
          <select
            className={styles.cardSelect}
            placeholder="select Label"
            style={{ display: 'none' }}
          >
            <option value="backend">backend</option>
            <option value="frontend">frontend</option>
          </select>
        </div>
        {hasError && <p className={styles.error}>Error</p>}
        <div className={styles.cardButton}>
          <button type="button" className={styles.cancelButton} name="close" onClick={Cancel}>
            Cancel
          </button>
          <button type="submit" className={styles.createButton} onClick={onSave}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

Card.defaultProps = {
  onCompletedSubmit: null
};

export default Card;
