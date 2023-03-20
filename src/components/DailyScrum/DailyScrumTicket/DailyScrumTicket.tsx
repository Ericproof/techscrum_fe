import React from 'react';
import styles from './DailyScrumTicket.module.scss';
import BinaryChoiceSelector from '../../ReusableElement/BinaryChoiceSelector/BinaryChoiceSelector';
import SupportTypeSelector from '../SupportTypeSelector/SupportTypeSelector';

interface IDailyScrumTicketProps {
  id: string;
  title: string;
  progress: number;
  isCanfinish: boolean;
  isNeedSupport: boolean;
  supportType: 0 | 1 | 2 | 3 | 4;
  projectAbbr: string;
  otherSupportDesc?: string;
  updateDailyScrumTicket: (
    id: string
  ) => (
    key: 'progress' | 'isCanFinish' | 'isNeedSupport' | 'supportType' | 'otherSupportDesc'
  ) => (value: number | string | boolean) => void;
}

export default function DailyScrumTicket({
  id,
  title,
  progress,
  isCanfinish,
  isNeedSupport,
  supportType,
  projectAbbr,
  otherSupportDesc,
  updateDailyScrumTicket
}: IDailyScrumTicketProps) {
  return (
    <div className={styles.dailyScrumTicket}>
      <p className={styles.ticketTitle}>
        {projectAbbr} - {title}
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
        <BinaryChoiceSelector
          name={`isCanFinish-${id}`}
          onChange={updateDailyScrumTicket(id)('isCanFinish')}
          onChangeSupport={updateDailyScrumTicket(id)('isNeedSupport')}
          resetSupportType={updateDailyScrumTicket(id)('supportType')}
          value={isCanfinish}
        />
      </div>
      {!isCanfinish ? (
        <div className={styles.support}>
          <p>Do you need support to complete this ticket?</p>
          <BinaryChoiceSelector
            name={`isNeedSupport-${id}`}
            onChange={updateDailyScrumTicket(id)('isNeedSupport')}
            resetSupportType={updateDailyScrumTicket(id)('supportType')}
            value={isNeedSupport}
          />
          {isNeedSupport ? (
            <SupportTypeSelector
              supportType={supportType}
              name={`supportType-${id}`}
              onChange={updateDailyScrumTicket(id)('supportType')}
              otherSupportDesc={otherSupportDesc}
              editOtherSupportDesc={updateDailyScrumTicket(id)('otherSupportDesc')}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

DailyScrumTicket.defaultProps = {
  otherSupportDesc: ''
};
