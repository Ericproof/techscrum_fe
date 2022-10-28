import React from 'react';
import styles from './DailyScrumTicket.module.scss';
import RadioInput from '../../ReusableElement/RadioInput/RadioInput';

interface IDailyScrumTicket {
  id: string;
  title: string;
  progress: string;
  finish: boolean;
  finishValidation: boolean;
  onChangeFinish: (id: string, value: boolean) => void;
  onChangeSupport: (id: string, value: boolean) => void;
  onChangeReason: (id: string, value: string) => void;
  onChangeProgress: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function DailyScrumTicket({
  id,
  title,
  progress,
  finish,
  finishValidation,
  onChangeFinish,
  onChangeSupport,
  onChangeReason,
  onChangeProgress
}: IDailyScrumTicket) {
  return (
    <div className={styles.dailyScrumTicket}>
      <p className={styles.ticketTitle}>
        {id} - {title}
      </p>
      <div className={styles.progress}>
        <p>Progress</p>
        <div className={styles.progressRange}>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            defaultValue="0"
            onChange={(e) => {
              onChangeProgress(id, e);
            }}
            data-testid={'dailyscrum-progress-bar-'.concat(id)}
          />
          <p data-testid={'dailyscrum-progress-'.concat(id)}>{progress}%</p>
        </div>
      </div>
      <div className={styles.finish}>
        <p>Can you finish this ticket by sprint end?</p>
        <RadioInput
          id="finish"
          name={`finish/${id}`}
          content="Yes"
          onChange={() => {
            onChangeFinish(id, true);
          }}
        />
        <RadioInput
          id="notFinish"
          name={`finish/${id}`}
          content="No"
          onChange={() => {
            onChangeFinish(id, false);
          }}
        />
        {!finish && finishValidation && (
          <div className={styles.anyReason}>
            <p>Any reasons?</p>
            <textarea
              name="reason"
              id=""
              cols={30}
              rows={10}
              onChange={(e) => {
                onChangeReason(id, e.target.value);
              }}
              data-testid={'dailyscrum-reason-'.concat(id)}
            />
          </div>
        )}
      </div>
      <div className={styles.support}>
        <p>Do you need support to complete this ticket?</p>
        <RadioInput
          id="support"
          name={`support/${id}`}
          content="Yes"
          onChange={() => {
            onChangeSupport(id, true);
          }}
        />
        <RadioInput
          id="notSupport"
          name={`support/${id}`}
          content="No"
          onChange={() => {
            onChangeSupport(id, false);
          }}
        />
      </div>
    </div>
  );
}
