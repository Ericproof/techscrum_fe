import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { DatePicker } from '@atlaskit/datetime-picker';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import styles from './CreateEditSprint.module.scss';
import Modal from '../../../lib/Modal/Modal';
import { createSprint, updateSprint, deleteSprint } from '../../../api/sprint/sprint';

interface ICreateEditSprint {
  type: string;
  onClickCloseModal: () => void;
  getBacklogDataApi: () => void;
  currentSprint?: any;
}
export default function CreateEditSprint({
  type,
  onClickCloseModal,
  getBacklogDataApi,
  currentSprint
}: ICreateEditSprint) {
  const dateWithDay = (date: string | null) => {
    if (date) {
      const fullDate = date.split('T')[0];
      return fullDate;
    }
    return '';
  };
  const dateAfter = (date: string, days: string) => {
    if (date) {
      const newDate = new Date(date);
      if (days === '1 week') {
        newDate.setDate(newDate.getDate() + 7);
        return dateWithDay(newDate.toISOString());
      }
      if (days === '2 weeks') {
        newDate.setDate(newDate.getDate() + 14);
        return dateWithDay(newDate.toISOString());
      }
      if (days === '3 weeks') {
        newDate.setDate(newDate.getDate() + 21);
        return dateWithDay(newDate.toISOString());
      }
    }
    return undefined;
  };
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const [duration, setDuration] = useState('Custom');
  const [sprintName, setSprintName] = useState(currentSprint ? currentSprint.name : '');
  const [startDate, setStartDate] = useState(
    currentSprint ? dateWithDay(currentSprint.startDate) : ''
  );
  const [endDate, setEndDate] = useState(currentSprint ? dateWithDay(currentSprint.endDate) : '');
  const [sprintGoal, setSprintGoal] = useState('');
  const { projectId = '', boardId = '' } = useParams();
  const durationList = ['1 week', '2 weeks', '3 weeks', 'Custom'];

  const onClickCreateSprint = () => {
    const data = {
      name: sprintName,
      projectId,
      boardId,
      startDate,
      endDate
    };
    createSprint(data).then(() => {
      getBacklogDataApi();
      onClickCloseModal();
    });
  };

  const onClickUpdateSprint = (id: string) => {
    const data = {
      name: sprintName,
      startDate,
      endDate
    };
    updateSprint(id, data).then(() => {
      getBacklogDataApi();
      onClickCloseModal();
    });
  };
  const onClickDeleteSprint = (id: string) => {
    deleteSprint(id).then(() => {
      getBacklogDataApi();
      onClickCloseModal();
    });
  };
  const onClickCompleteSprint = (id: string) => {
    const data = { isComplete: true };
    updateSprint(id, data).then(() => {
      getBacklogDataApi();
      onClickCloseModal();
    });
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Modal classesName={styles.createEditSprintModal}>
          <div className={styles.createEditSprintContainer}>
            <div className={styles.createEditSprintHeader}>
              <h2>{type} Sprint</h2>
              <button className={styles.closeBtn} onClick={onClickCloseModal}>
                <AiOutlineClose />
              </button>
            </div>
            <div className={styles.createEditSprintInputContainer}>
              <div className={styles.inputContainer}>
                <p className={styles.label}>Sprint Name:</p>
                <input
                  type="text"
                  name="name"
                  value={sprintName}
                  className={styles.textInput}
                  onChange={(e) => {
                    setSprintName(e.target.value);
                  }}
                />
              </div>
              <div className={[styles.duration, styles.inputContainer].join(' ')} ref={myRef}>
                <p className={styles.label}>Duration:</p>
                <button
                  className={[styles.selectInput, visible && styles.outline].join(' ')}
                  onClick={() => {
                    setVisible(!visible);
                  }}
                >
                  {duration}
                  <BiChevronDown />
                </button>
                {visible && (
                  <ul className={styles.dropDownDuration}>
                    {durationList.map((item) => {
                      return (
                        <li key={item}>
                          <button
                            onClick={() => {
                              setDuration(item);
                              setVisible(false);
                            }}
                          >
                            {item}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <div className={styles.inputContainer}>
                <p className={styles.label}>Start date:</p>
                <div className={styles.datePicker}>
                  <DatePicker
                    appearance="subtle"
                    dateFormat="MM-DD-YYYY"
                    placeholder="e.g 11-13-2018"
                    value={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                    }}
                  />
                </div>
              </div>
              <div className={styles.inputContainer}>
                <p className={styles.label}>End date:</p>
                <div className={styles.datePicker}>
                  <DatePicker
                    appearance="subtle"
                    dateFormat="MM-DD-YYYY"
                    placeholder="e.g 12-13-2018"
                    minDate={startDate}
                    maxDate={dateAfter(startDate, duration)}
                    value={dateAfter(startDate, duration) ?? endDate}
                    onChange={(date) => {
                      setEndDate(date);
                    }}
                  />
                </div>
              </div>
              <div>
                <p className={styles.label}>Sprint goal:</p>
                <textarea
                  name="sprint-goal"
                  id=""
                  cols={30}
                  rows={10}
                  value={sprintGoal}
                  className={styles.textAreaInput}
                  onChange={(e) => {
                    setSprintGoal(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={styles.btnContainer}>
              <button className={styles.cancelBtn} onClick={onClickCloseModal}>
                Cancel
              </button>
              {type === 'Edit' && (
                <>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => {
                      onClickDeleteSprint(currentSprint.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className={styles.completeBtn}
                    onClick={() => {
                      onClickCompleteSprint(currentSprint.id);
                    }}
                  >
                    Complete
                  </button>
                </>
              )}
              <button
                className={styles.submitBtn}
                onClick={() => {
                  if (type === 'Create') {
                    onClickCreateSprint();
                  } else {
                    onClickUpdateSprint(currentSprint.id);
                  }
                }}
              >
                {type === 'Create' ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        </Modal>,
        document.getElementById('root') as Element
      )}
    </>
  );
}
CreateEditSprint.defaultProps = {
  currentSprint: null
};
