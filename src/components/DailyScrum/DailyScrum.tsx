import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './DailyScrum.module.scss';
import DailyScrumTicket from './DailyScrumTicket/DailyScrumTicket';
import Modal from '../Modal/Modal';
import { createDailyScrum } from '../../api/dailyScrum/dailyScrum';

// WIP need to add submit function

interface IDailyScrumModal {
  onClickCloseModal: () => void;
  projectId: string;
}
function DailyScrumModal({ onClickCloseModal, projectId }: IDailyScrumModal) {
  const date = '01/10/2022';
  const dummyDailyScrumTicketData = [
    {
      id: 'TEC-333',
      title: 'create daily scrum',
      progress: '0',
      reason: '',
      finish: false,
      support: false,
      supportValidation: false,
      finishValidation: false
    },
    {
      id: 'TEC-334',
      title: 'create backlog page',
      progress: '0',
      reason: '',
      finish: false,
      support: false,
      supportValidation: false,
      finishValidation: false
    }
  ];
  const [dailyScrumTicketData, setDailyScrumTicketData] = useState(dummyDailyScrumTicketData);
  const [submitting, setSubmitting] = useState(false);
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
    await createDailyScrum(projectId, dailyScrumTicketData);
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
      <h4>Today: {date}</h4>
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
