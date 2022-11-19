import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { toast } from 'react-toastify';
import styles from './OptionBtn.module.scss';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import { deleteTask, updateTask } from '../../../api/backlog/backlog';

interface IOptionBtn {
  taskId: string;
  showOptionBtn: boolean;
  sprintId: string;
  sprintData: any;
  toggleDisableShowOptionBtnEffect: () => void;
  getBacklogDataApi: () => void;
}
export default function OptionBtn({
  taskId,
  showOptionBtn,
  sprintId,
  sprintData,
  toggleDisableShowOptionBtnEffect,
  getBacklogDataApi
}: IOptionBtn) {
  const [clickOptionBtnShowStyle, setClickOptionBtnShowStyle] = useState(false);
  const [hoverOptionBtn, setHoverOptionBtn] = useState(false);

  const action = () => {
    toggleDisableShowOptionBtnEffect();
    setClickOptionBtnShowStyle(false);
  };
  const { visible, setVisible, myRef } = useOutsideAlerter(false, action);

  const onClickDelete = (id: string) => {
    deleteTask(id)
      .then(() => {
        getBacklogDataApi();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
    setVisible(false);
  };

  const onClickAddToBacklog = (id: string) => {
    const data = { sprintId: null };
    updateTask(id, data)
      .then(() => {
        getBacklogDataApi();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
    setVisible(false);
  };
  const onClickAddToSprint = (id: string, sprintIdToAdd: string) => {
    const data = { sprintId: sprintIdToAdd };
    updateTask(id, data)
      .then(() => {
        getBacklogDataApi();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
    setVisible(false);
  };

  let btnClassName = '';
  if (showOptionBtn && clickOptionBtnShowStyle) {
    btnClassName = [styles.optionBtn, styles.showOptionBtn, styles.clickOptionBtn].join(' ');
  } else if (showOptionBtn && hoverOptionBtn) {
    btnClassName = [styles.optionBtn, styles.showOptionBtn, styles.optionBtnHover].join(' ');
  } else if (showOptionBtn) {
    btnClassName = [styles.optionBtn, styles.showOptionBtn].join(' ');
  } else {
    btnClassName = styles.optionBtn;
  }
  return (
    <div className={styles.optionBtnContainer} ref={myRef}>
      <button
        className={btnClassName}
        onClick={() => {
          setVisible(!visible);
          setClickOptionBtnShowStyle(!clickOptionBtnShowStyle);
          toggleDisableShowOptionBtnEffect();
        }}
        onMouseOver={() => {
          setHoverOptionBtn(true);
        }}
        onMouseOut={() => {
          setHoverOptionBtn(false);
        }}
        onBlur={() => {}}
        onFocus={() => {}}
        data-testid={'hover-show-option-btn-'.concat(taskId)}
      >
        <BsThreeDots />
      </button>
      <div
        className={
          visible
            ? [styles.optionBtnDropDown, styles.showOptionBtnDropDown].join(' ')
            : styles.optionBtnDropDown
        }
      >
        <ul>
          <p>Actions</p>
          <li>
            <button className={styles.dropDownBtn}>Copy issue link</button>
          </li>
          {sprintId && (
            <li>
              <button
                className={styles.dropDownBtn}
                onClick={() => {
                  onClickAddToBacklog(taskId);
                }}
              >
                Add to Backlog
              </button>
            </li>
          )}
          {sprintData
            .filter((sprint) => {
              return sprint.id !== sprintId && !sprint.isComplete;
            })
            .map((sprint) => {
              return (
                <li key={sprint.id}>
                  <button
                    className={styles.dropDownBtn}
                    onClick={() => {
                      onClickAddToSprint(taskId, sprint.id);
                    }}
                  >
                    Add to {sprint.name}
                  </button>
                </li>
              );
            })}
          <li>
            <button
              className={styles.dropDownBtn}
              onClick={() => {
                onClickDelete(taskId);
              }}
              data-testid={'delete-task-'.concat(taskId)}
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
