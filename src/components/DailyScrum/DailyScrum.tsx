import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './DailyScrum.module.scss';
import DailyScrumTicket from './DailyScrumTicket/DailyScrumTicket';
import Modal from '../Modal/Modal';

// WIP need to add submit function

interface IDailyScrumModal {
  onClickCloseModal: () => void;
}
function DailyScrumModal({ onClickCloseModal }: IDailyScrumModal) {
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

  return (
    <>
      <div className={styles.dailyScrumHeader}>
        <h2>Daily Log</h2>
        <button className={styles.closeBtn} onClick={onClickCloseModal}>
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
        <button className={styles.cancelBtn} onClick={onClickCloseModal}>
          Cancel
        </button>
        <button className={styles.submitBtn} onClick={onClickCloseModal}>
          Submit
        </button>
      </div>
    </>
  );
}

interface IDailyScrum {
  onClickCloseModal: () => void;
}
export default function DailyScrum({ onClickCloseModal }: IDailyScrum) {
  return (
    <>
      {ReactDOM.createPortal(
        <Modal classesName={styles.dailyScrumModal}>
          <DailyScrumModal onClickCloseModal={onClickCloseModal} />
        </Modal>,
        document.getElementById('root') as Element
      )}
    </>
  );
}
