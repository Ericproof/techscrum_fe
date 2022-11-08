import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './DailyScrum.module.scss';
import DailyScrumTicket from './DailyScrumTicket/DailyScrumTicket';
import Modal from '../Modal/Modal';
import { getDailyScrumByUser, updateDailyScrum } from '../../api/dailyScrum/dailyScrum';
import { UserContext } from '../../context/UserInfoProvider';

// WIP need to add submit function

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
    month = month + 1 < 10 ? `0${month + 1}` : month;
    return `${day}-${month}-${year}`;
  };
  const [dailyScrumTicketData, setDailyScrumTicketData] = useState<any>([]);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    const handleDailyScrum = async () => {
      const results = await getDailyScrumByUser(projectId, userId);
      const dailyResult = results.data.filter((result) => {
        return result.createdDate === dateHandler(new Date());
      });
      if (dailyResult.length > 0) {
        setDailyScrumTicketData(dailyResult);
      } else {
        const newResults = await getDailyScrumByUser(projectId, userId);
        const newDailyResults = newResults.data
          .filter((result) => {
            return result.createdDate === dateHandler(new Date());
          })
          .filter((result) => {
            return result.taskId.id === userId;
          });
        setDailyScrumTicketData(newDailyResults);
      }
    };
    handleDailyScrum();
  }, [projectId, userId]);
  useEffect(() => {}, []);

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
        // eslint-disable-next-line no-underscore-dangle
        await updateDailyScrum(data, projectId, userId, ticket.taskId._id);
      });
    setSubmitting(false);
  };
  return (
    <>
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
      {dailyScrumTicketData
        .filter((ticket) => {
          return dateHandler(ticket.createdAt) === dateHandler(new Date());
        })
        .map((ticket) => {
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
    </>
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
