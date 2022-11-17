/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { DatePicker } from '@atlaskit/datetime-picker';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import styles from './CreateEditSprint.module.scss';
import Modal from '../../../components/Modal/Modal';

interface ICreateEditSprint {
  type: string;
  onClickCloseModal: () => void;
}
export default function CreateEditSprint({ type, onClickCloseModal }: ICreateEditSprint) {
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const [duration, setDuration] = useState('Custom');
  const [sprintName, setSprintName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sprintGoal, setSprintGoal] = useState('');

  const durationList = ['1 week', '2 weeks', '3 weeks', 'Custom'];

  return (
    <>
      {ReactDOM.createPortal(
        <Modal classesName={styles.createEditSprintModal}>
          <div className={styles.createEditSprintContainer}>
            <div className={styles.createEditSprintHeader}>
              <h2>{type} Sprint</h2>
              <button
                className={styles.closeBtn}
                onClick={onClickCloseModal}
                data-testid="dailyscrum-close"
              >
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
                    value={endDate}
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
              <button
                className={styles.cancelBtn}
                onClick={onClickCloseModal}
                data-testid="dailyscrum-cancel"
              >
                Cancel
              </button>
              <button className={styles.submitBtn}>
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
