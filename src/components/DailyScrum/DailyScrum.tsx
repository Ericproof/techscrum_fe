import React, { MouseEvent, useContext, useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { DatePicker } from '@atlaskit/datetime-picker';
import styles from './DailyScrum.module.scss';
import { getDailyScrums, updateDailyScrum } from '../../api/dailyScrum/dailyScrum';
import { UserContext } from '../../context/UserInfoProvider';
import Modal from '../../lib/Modal/Modal';
import { dateFormatter } from '../../utils/helpers';
import { IUserInfo, IDailyScrumTicket } from '../../types';
import DailyScrumTicket from './DailyScrumTicket/DailyScrumTicket';

interface IDailyScrumModal {
  onClickCloseModal: () => void;
  projectId: string;
}

type IDailyScrumTicketsActionKey = keyof typeof dailyScrumTicketsActionTypes;
type IDailyScrumTicketsActionType =
  typeof dailyScrumTicketsActionTypes[IDailyScrumTicketsActionKey];

type IDailyScrumTicketUpdate = Partial<IDailyScrumTicket> & { id: string };

interface IDailyScrumTicketsAction {
  type: IDailyScrumTicketsActionType;
  payload: IDailyScrumTicketUpdate | IDailyScrumTicket[];
}

const SEARCH_CASE = 'search-all';

const initialDailyScrumTickets: IDailyScrumTicket[] = [];

const dailyScrumTicketsActionTypes = {
  updateOneTicket: 'UPDATE_ONE_TICKET',
  getAllTickets: 'GET_ALL_TICKET'
};

const dailyScrumTicketsReducer = (state: IDailyScrumTicket[], action: IDailyScrumTicketsAction) => {
  switch (action.type) {
    case dailyScrumTicketsActionTypes.getAllTickets:
      return [...state, ...(action.payload as IDailyScrumTicket[])];

    case dailyScrumTicketsActionTypes.updateOneTicket:
      return state.map((ticket: IDailyScrumTicket) =>
        ticket.id === (action.payload as IDailyScrumTicketUpdate).id
          ? { ...ticket, ...action.payload }
          : { ...ticket }
      );

    default:
      return [...state];
  }
};

function DailyScrumModal({ onClickCloseModal, projectId }: IDailyScrumModal): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [calendarDate, setCalendarDate] = useState<string>(dateFormatter(undefined, true));

  const [dailyScrumTickets, dispatch] = useReducer(
    dailyScrumTicketsReducer,
    initialDailyScrumTickets
  );

  const { id: userId }: IUserInfo = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const results = await getDailyScrums(projectId, userId, 'none', 'none', SEARCH_CASE);

        if (results.length === 0) {
          toast('No dailyScrum data for now!', { theme: 'colored', toastId: 'dailyScrum error' });
        }

        dispatch({ type: dailyScrumTicketsActionTypes.getAllTickets, payload: results });
      } catch (e: any) {
        toast.error('Failed to get dailyScrum data!', {
          theme: 'colored',
          toastId: 'dailyScrum error'
        });
      }
    })();
  }, [projectId, userId]);

  const updateDailyScrumTicket =
    (id: string) =>
    (key: 'progress' | 'isFinished' | 'isNeedSupport' | 'reason') =>
    (value: number | string | boolean) => {
      // What is this for????? validations????
      // if this is only UI related, then make it a local state
      if (key === 'isFinished') {
        dispatch({
          type: dailyScrumTicketsActionTypes.updateOneTicket,
          payload: {
            id,
            finishValidation: true
          }
        });
      }

      if (key === 'isNeedSupport') {
        dispatch({
          type: dailyScrumTicketsActionTypes.updateOneTicket,
          payload: {
            id,
            supportValidation: true
          }
        });
      }

      return dispatch({
        type: dailyScrumTicketsActionTypes.updateOneTicket,
        payload: {
          id,
          [key]: value
        }
      });
    };

  const onHandleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);

      // createDate is not in a correct format that can be accepted by new Date()
      // useCreateAt instead
      dailyScrumTickets
        .filter(({ createAt }: IDailyScrumTicket) => {
          return dateFormatter(createAt) === dateFormatter();
        })
        .map(
          async ({
            progress = 0,
            isFinished = false,
            reason = '',
            isNeedSupport = false,
            finishValidation = false,
            supportValidation = false,
            taskId
          }) => {
            const data = {
              progress,
              isFinished,
              hasReason: !!reason,
              reason,
              isNeedSupport,
              createdDate: dateFormatter(),
              finishValidation,
              supportValidation
            };

            window.console.log(taskId, data);
            await updateDailyScrum(data, projectId, userId, taskId);
          }
        );
      toast.success('Submit successful!', {
        theme: 'colored',
        className: 'primaryColorBackground',
        toastId: 'dailyScrum success'
      });
      onClickCloseModal();
      setIsSubmitting(false);
    } catch (error) {
      toast.error('Temporarily server error, please try again later!', {
        theme: 'colored',
        toastId: 'dailyScrum error'
      });
    }
  };
  return (
    <div className={styles.dailyScrumContainer}>
      <div className={styles.dailyScrumHeader}>
        <h2 data-testid="dailyscrum-header">Daily Log</h2>
        <button
          className={styles.closeBtn}
          onClick={onClickCloseModal}
          data-testid="dailyscrum-close"
        >
          <AiOutlineClose />
        </button>
      </div>
      <h4>Today: {dateFormatter()}</h4>
      <div className={styles.dailyScrumContent}>
        <DatePicker
          spacing="compact"
          appearance="subtle"
          defaultIsOpen
          isOpen
          locale="en-AU"
          dateFormat="MM-DD-YYYY"
          placeholder="e.g 11-13-2018"
          value={calendarDate}
          onChange={(e) => {
            setCalendarDate(e);
          }}
        />
        <div className={styles.dailyScrumTicketsListWrapper}>
          {dailyScrumTickets.map(
            ({ id, title, progress, isFinished, finishValidation, isNeedSupport, reason }) => {
              return (
                <DailyScrumTicket
                  key={id}
                  id={id}
                  title={title}
                  progress={progress}
                  reason={reason}
                  finish={isFinished}
                  isNeedSupport={isNeedSupport}
                  finishValidation={finishValidation as boolean}
                  updateDailyScrumTicket={updateDailyScrumTicket}
                />
              );
            }
          )}
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
        <button
          className={styles.submitBtn}
          onClick={onHandleSubmit}
          disabled={isSubmitting}
          data-testid="dailyscrum-submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

interface IDailyScrum {
  onClickCloseModal: () => void;
  projectId: string;
}
export default function DailyScrum({ onClickCloseModal, projectId }: IDailyScrum) {
  return (
    <>
      {ReactDOM.createPortal(
        <Modal classesName={styles.dailyScrumModal}>
          <DailyScrumModal onClickCloseModal={onClickCloseModal} projectId={projectId} />
        </Modal>,
        document.getElementById('root') as Element
      )}
    </>
  );
}
