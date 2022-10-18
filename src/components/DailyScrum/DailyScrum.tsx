import React from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './DailyScrum.module.scss';
import DailyScrumTicket from './DailyScrumTicket/DailyScrumTicket';

// WIP need to add submit function

interface IDailyScrumModal {
  onClickCloseModal: () => void;
}
function DailyScrumModal({ onClickCloseModal }: IDailyScrumModal) {
  const date = '01/10/2022';
  const dailyScrumTicketData = [
    {
      id: 'TEC-333',
      title: 'create daily scrum'
    },
    { id: 'TEC-334', title: 'create backlog page' }
  ];
  return (
    <div className={styles.backdrop}>
      <div className={styles.dailyScrumContainer}>
        <div className={styles.dailyScrumHeader}>
          <h2>Daily Log</h2>
          <button className={styles.closeBtn} onClick={onClickCloseModal}>
            <AiOutlineClose />
          </button>
        </div>
        <h4>Today: {date}</h4>
        {dailyScrumTicketData.map((ticket) => {
          return <DailyScrumTicket key={ticket.id} id={ticket.id} title={ticket.title} />;
        })}
        <div className={styles.btnContainer}>
          <button className={styles.cancelBtn} onClick={onClickCloseModal}>
            Cancel
          </button>
          <button className={styles.submitBtn} onClick={onClickCloseModal}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

interface IDailyScrum {
  onClickCloseModal: () => void;
}
export default function DailyScrum({ onClickCloseModal }: IDailyScrum) {
  return (
    <>
      {ReactDOM.createPortal(
        <DailyScrumModal onClickCloseModal={onClickCloseModal} />,
        document.getElementById('dailyScrum') as Element
      )}
    </>
  );
}
