import React, { useCallback } from 'react';
import styles from './DailyScrumTicket.module.scss';
import BinaryChoiceSelector from '../../ReusableElement/BinaryChoiceSelector/BinaryChoiceSelector';
import SupportTypeSelector from '../SupportTypeSelector/SupportTypeSelector';

enum UpdateDailyScrumTicketParamKey {
  progress = 'progress',
  isCanFinish = 'isCanFinish',
  isNeedSupport = 'isNeedSupport',
  supportType = 'supportType',
  otherSupportDesc = 'otherSupportDesc'
}

enum SupportType {
  noSupport,
  technical,
  requirement,
  dependency,
  other
}

interface IDailyScrumTicketProps {
  id: string;
  title: string;
  progress: number;
  isCanfinish: boolean;
  isNeedSupport: boolean;
  supportType: SupportType;
  projectAbbr: string;
  otherSupportDesc?: string;
  updateDailyScrumTicket: (
    key: UpdateDailyScrumTicketParamKey
  ) => (value: number | string | boolean) => void;
  errMsg?: string;
}

function DailyScrumTicket({
  id,
  title,
  progress,
  isCanfinish,
  isNeedSupport,
  supportType,
  projectAbbr,
  otherSupportDesc,
  errMsg,
  updateDailyScrumTicket
}: IDailyScrumTicketProps) {
  const handleResetStates = useCallback(
    (states: Array<UpdateDailyScrumTicketParamKey>) => () => {
      return states.forEach((state) => {
        if (state === UpdateDailyScrumTicketParamKey.isNeedSupport) {
          updateDailyScrumTicket(state)(false);
        }

        if (state === UpdateDailyScrumTicketParamKey.supportType) {
          updateDailyScrumTicket(state)(0);
        }

        if (state === UpdateDailyScrumTicketParamKey.otherSupportDesc) {
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
      {errMsg && <p>{errMsg}</p>}
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
              updateDailyScrumTicket(UpdateDailyScrumTicketParamKey.progress)(
                e.target.valueAsNumber
              );
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
          onChange={updateDailyScrumTicket(UpdateDailyScrumTicketParamKey.isCanFinish)}
          handleResetStates={handleResetStates([
            UpdateDailyScrumTicketParamKey.isNeedSupport,
            UpdateDailyScrumTicketParamKey.supportType,
            UpdateDailyScrumTicketParamKey.otherSupportDesc
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
            onChange={updateDailyScrumTicket(UpdateDailyScrumTicketParamKey.isNeedSupport)}
            handleResetStates={handleResetStates([
              UpdateDailyScrumTicketParamKey.supportType,
              UpdateDailyScrumTicketParamKey.otherSupportDesc
            ])}
            isResetHanlderForOptionYes={false}
            value={isNeedSupport}
          />
          {isNeedSupport ? (
            <SupportTypeSelector
              supportType={supportType}
              name={`supportType-${id}`}
              onChange={updateDailyScrumTicket(UpdateDailyScrumTicketParamKey.supportType)}
              otherSupportDesc={otherSupportDesc}
              editOtherSupportDesc={updateDailyScrumTicket(
                UpdateDailyScrumTicketParamKey.otherSupportDesc
              )}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(DailyScrumTicket);

DailyScrumTicket.defaultProps = {
  otherSupportDesc: '',
  errMsg: ''
};
