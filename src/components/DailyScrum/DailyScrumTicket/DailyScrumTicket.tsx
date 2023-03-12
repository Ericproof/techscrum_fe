import React from 'react';
import styles from './DailyScrumTicket.module.scss';
import RadioInput from '../../ReusableElement/RadioInput/RadioInput';

interface IDailyScrumTicket {
  id: string;
  title: string;
  progress: number;
  finish: boolean;
  reason?: string;
  isNeedSupport: boolean;
  finishValidation: boolean;
  updateDailyScrumTicket: (
    id: string
  ) => (
    key: 'progress' | 'isFinished' | 'isNeedSupport' | 'reason'
  ) => (value: number | string | boolean) => void;
}

export default function DailyScrumTicket({
  id,
  title,
  progress,
  finish,
  finishValidation,
  isNeedSupport,
  updateDailyScrumTicket,
  reason
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
            defaultValue={progress}
            onChange={(e) => {
              updateDailyScrumTicket(id)('progress')(e.target.valueAsNumber);
            }}
            data-testid={'dailyscrum-progress-bar-'.concat(id)}
          />
          <p data-testid={'dailyscrum-progress-'.concat(id)}>{progress}%</p>
        </div>
      </div>
      <div className={styles.finish}>
        <p>Can you finish this ticket by sprint end?</p>
        <RadioInput
          name={`finish/${id}`}
          onChange={updateDailyScrumTicket(id)('isFinished')}
          value={finish}
        />
        {!finish && finishValidation && (
          <div className={styles.anyReason}>
            <p>Any reasons?</p>
            <textarea
              name="reason"
              id=""
              cols={30}
              rows={10}
              value={reason}
              onChange={(e) => {
                updateDailyScrumTicket(id)('reason')(e.target.value);
              }}
              data-testid={'dailyscrum-reason-'.concat(id)}
            />
          </div>
        )}
      </div>
      <div className={styles.support}>
        <p>Do you need support to complete this ticket?</p>
        <RadioInput
          name={`support/${id}`}
          onChange={updateDailyScrumTicket(id)('isNeedSupport')}
          value={isNeedSupport}
        />
      </div>
    </div>
  );
}

DailyScrumTicket.defaultProps = {
  reason: ''
};
