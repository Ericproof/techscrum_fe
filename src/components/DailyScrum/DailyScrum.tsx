import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import styles from './DailyScrum.module.scss';
import DailyScrumTicket from './DailyScrumTicket/DailyScrumTicket';

import { getDailyScrums, updateDailyScrum } from '../../api/dailyScrum/dailyScrum';
import { UserContext } from '../../context/UserInfoProvider';
import Modal from '../../lib/Modal/Modal';

interface IDailyScrumModal {
  onClickCloseModal: () => void;
  projectId: string;
}
function DailyScrumModal({ onClickCloseModal, projectId }: IDailyScrumModal) {
  const userInfo = useContext(UserContext);
  const userId = userInfo.id;
  const dateHandler = (fullDate) => {
    const date = new Date(fullDate);
    const year = date.getFullYear();
    let month: string | number = date.getMonth();
    let day: string | number = date.getDate();
    day = day < 10 ? `0${day}` : day;
    month = month + 1 < 10 ? `0${month + 1}` : month + 1;
    return `${day}-${month}-${year}`;
  };
  const [dailyScrumTicketData, setDailyScrumTicketData] = useState<any>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleDailyScrum = async () => {
      try {
        const searchCase = 'search-all';
        const results = await getDailyScrums(projectId, userId, 'none', 'none', searchCase);
        if (results.data.length === 0) {
          toast('No dailyScrum data for now!', { theme: 'colored', toastId: 'dailyScrum error' });
        }
        setDailyScrumTicketData(results.data);
      } catch (e) {
        toast.error('Failed tp get dailyScrum data!', {
          theme: 'colored',
          toastId: 'dailyScrum error'
        });
      }
    };
    handleDailyScrum();
  }, [projectId, userId]);

  const onChangeFinish = (id: string, value: boolean) => {
    setDailyScrumTicketData(
      dailyScrumTicketData.map((ticket) => {
        if (ticket.id === id) {
          return { ...ticket, finish: value, finishValidation: true };
        }
        return ticket;
      })
    );
  };
  const onChangeSupport = (id: string, value: boolean) => {
    setDailyScrumTicketData(
      dailyScrumTicketData.map((ticket) => {
        if (ticket.id === id) {
          return { ...ticket, support: value, supportValidation: true };
        }
        return ticket;
      })
    );
  };
  const onChangeReason = (id: string, value: string) => {
    setDailyScrumTicketData(
      dailyScrumTicketData.map((ticket) => {
        if (ticket.id === id) {
          return { ...ticket, reason: value };
        }
        return ticket;
      })
    );
  };
  const onChangeProgress = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setDailyScrumTicketData(
      dailyScrumTicketData.map((ticket) => {
        if (ticket.id === id) {
          return { ...ticket, progress: e.target.value };
        }
        return ticket;
      })
    );
  };
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    dailyScrumTicketData
      .filter((ticket) => {
        return dateHandler(ticket.createdAt) === dateHandler(new Date());
      })
      .map(async (ticket) => {
        const data = {
          progress: ticket.progress ? ticket.progress : 0,
          isFinished: ticket.finish ? ticket.finish : false,
          hasReason: !!ticket.reason,
          reason: ticket.reason ? ticket.reason : '',
          isNeedSupport: ticket.support ? ticket.support : false,
          createdDate: dateHandler(new Date()),
          finishValidation: ticket.finishValidation ? ticket.finishValidation : false,
          supportValidation: ticket.supportValidation ? ticket.supportValidation : false
        };
        await updateDailyScrum(data, projectId, userId, ticket.taskId.id);
      });
    setSubmitting(false);
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
      <h4>Today: {dateHandler(new Date())}</h4>
      {dailyScrumTicketData.map((ticket) => {
        return (
          <DailyScrumTicket
            key={ticket.id}
            id={ticket.id}
            title={ticket.title}
            progress={ticket.progress}
            finish={ticket.finish}
            finishValidation={ticket.finishValidation}
            onChangeFinish={onChangeFinish}
            onChangeSupport={onChangeSupport}
            onChangeReason={onChangeReason}
            onChangeProgress={onChangeProgress}
          />
        );
      })}
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
          disabled={submitting}
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
