import React, { useCallback } from 'react';
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
  const handleResetStates = useCallback(
    (states: Array<'isNeedSupport' | 'supportType' | 'otherSupportDesc'>) => () => {
      return states.forEach((state) => {
        if (state === 'isNeedSupport') {
          updateDailyScrumTicket(state)(false);
        }

        if (state === 'supportType') {
          updateDailyScrumTicket(state)(0);
        }

        if (state === 'otherSupportDesc') {
          updateDailyScrumTicket(state)('');
        }
      });
    },
    [updateDailyScrumTicket]
  );

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
              updateDailyScrumTicket('progress')(e.target.valueAsNumber);
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
          onChange={updateDailyScrumTicket('isCanFinish')}
          handleResetStates={handleResetStates([
            'isNeedSupport',
            'supportType',
            'otherSupportDesc'
          ])}
          isResetHanlderForOptionYes
          value={isCanfinish}
        />
      </div>
      {!isCanfinish ? (
        <div className={styles.support}>
          <p>Do you need support to complete this ticket?</p>
          <BinaryChoiceSelector
            name={`isNeedSupport-${id}`}
            onChange={updateDailyScrumTicket('isNeedSupport')}
            handleResetStates={handleResetStates(['supportType', 'otherSupportDesc'])}
            isResetHanlderForOptionYes={false}
            value={isNeedSupport}
          />
          {isNeedSupport ? (
            <SupportTypeSelector
              supportType={supportType}
              name={`supportType-${id}`}
              onChange={updateDailyScrumTicket('supportType')}
              otherSupportDesc={otherSupportDesc}
              editOtherSupportDesc={updateDailyScrumTicket('otherSupportDesc')}
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
