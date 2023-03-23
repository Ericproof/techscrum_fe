import React, { MouseEvent, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { DatePicker } from '@atlaskit/datetime-picker';
import { AxiosResponse } from 'axios';
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

// id is required but any other properties of IDailyScrumTicket are optional
type IDailyScrumTicketUpdate = Partial<IDailyScrumTicket> & { id: string };

enum DailyScrumTicketsActionType {
  updateOneTicket = 'UPDATE_ONE_TICKET',
  getAllTickets = 'GET_ALL_TICKET'
}

interface IDailyScrumTicketsAction {
  type: DailyScrumTicketsActionType;
  payload: IDailyScrumTicketUpdate | IDailyScrumTicket[];
}

const initialDailyScrumTickets: IDailyScrumTicket[] = [];

const dailyScrumTicketsReducer = (state: IDailyScrumTicket[], action: IDailyScrumTicketsAction) => {
  switch (action.type) {
    case DailyScrumTicketsActionType.getAllTickets:
      return [...state, ...(action.payload as IDailyScrumTicket[])];

    case DailyScrumTicketsActionType.updateOneTicket:
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
  const [calendarDate, setCalendarDate] = useState<string>(
    dateFormatter(undefined, { isToISO: true })
  );

  const [dailyScrumTickets, dispatch] = useReducer(
    dailyScrumTicketsReducer,
    initialDailyScrumTickets
  );

  const { id: userId }: IUserInfo = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const results = await getDailyScrums(projectId, userId as string);

        if (results.length === 0) {
          toast('No dailyScrum data for now!', { theme: 'colored', toastId: 'dailyScrum error' });
        }

        dispatch({ type: DailyScrumTicketsActionType.getAllTickets, payload: results });
      } catch (e: any) {
        toast.error('Failed to get dailyScrum data!', {
          theme: 'colored',
          toastId: 'dailyScrum error'
        });
      }
    })();
  }, [projectId, userId]);

  const updateDailyScrumTicket = useCallback(
    (id: string) =>
      (key: 'progress' | 'isCanFinish' | 'isNeedSupport' | 'supportType' | 'otherSupportDesc') =>
      (value: number | string | boolean) => {
        return dispatch({
          type: DailyScrumTicketsActionType.updateOneTicket,
          payload: {
            id,
            [key]: value
          }
        });
      },
    []
  );

  const onHandleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const promises = dailyScrumTickets.map(
      ({ progress, isCanFinish, isNeedSupport, supportType, id, otherSupportDesc }) => {
        return updateDailyScrum(projectId, id, {
          progress,
          isCanFinish,
          isNeedSupport,
          supportType,
          otherSupportDesc
        });
      }
    );

    try {
      const results: PromiseSettledResult<AxiosResponse<any, any>>[] = await Promise.allSettled(
        promises
      );

      if (results.map((result) => result.status).every((status) => status === 'fulfilled')) {
        toast.success('Submit successful!', {
          theme: 'colored',
          className: 'primaryColorBackground',
          toastId: 'dailyScrum success'
        });
        onClickCloseModal();
        setIsSubmitting(false);
      } else {
        const failedResults: any = results.filter((result) => result.status === 'rejected');

        window.console.log(failedResults[0]?.reason.response.data.errors.errors[0]);
      }
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
          <p>You currently have {dailyScrumTickets.length} dailyScrum(s)</p>
          {dailyScrumTickets.map(
            ({
              id,
              title,
              progress,
              isCanFinish,
              isNeedSupport,
              supportType,
              project,
              otherSupportDesc
            }) => {
              return (
                <DailyScrumTicket
                  key={id}
                  id={id}
                  title={title}
                  projectAbbr={project.key}
                  progress={progress}
                  isCanfinish={isCanFinish}
                  isNeedSupport={isNeedSupport}
                  supportType={supportType}
                  otherSupportDesc={otherSupportDesc}
                  updateDailyScrumTicket={updateDailyScrumTicket(id)}
                />
              );
            }
          )}
        </div>
      </div>

      <div className={styles.btnContainer}>
        <button
          className={styles.cancelBtn}
          type="button"
          onClick={onClickCloseModal}
          data-testid="dailyscrum-cancel"
        >
          Cancel
        </button>
        <button
          className={styles.submitBtn}
          onClick={onHandleSubmit}
          disabled={isSubmitting}
          type="button"
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
