import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import styles from './DailyScrum.module.scss';
import DailyScrumTicket from './DailyScrumTicket/DailyScrumTicket';
import {
  getDailyScrums,
  IDailyScrumTicket,
  updateDailyScrum
} from '../../api/dailyScrum/dailyScrum';
import { UserContext } from '../../context/UserInfoProvider';
import Modal from '../../lib/Modal/Modal';
import { dateFormatter } from '../../utils/helpers';
import { IUserInfo } from '../../types';

interface IDailyScrumModal {
  onClickCloseModal: () => void;
  projectId: string;
}

const SEARCH_CASE = 'search-all';

function DailyScrumModal({ onClickCloseModal, projectId }: IDailyScrumModal): JSX.Element {
  const [dailyScrumTicketData, setDailyScrumTicketData] = useState<IDailyScrumTicket[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { id: userId }: IUserInfo = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const results = await getDailyScrums(projectId, userId, 'none', 'none', SEARCH_CASE);

        if (results.length === 0) {
          toast('No dailyScrum data for now!', { theme: 'colored', toastId: 'dailyScrum error' });
        }

        setDailyScrumTicketData(results);
      } catch (e: any) {
        toast.error('Failed to get dailyScrum data!', {
          theme: 'colored',
          toastId: 'dailyScrum error'
        });
      }
    })();
  }, [projectId, userId]);

  const onChangeFinish = (id: string, isFinished: boolean) => {
    setDailyScrumTicketData(
      dailyScrumTicketData.map((ticket) => {
        if (ticket.id === id) {
          return { ...ticket, isFinished, finishValidation: true };
        }
        return ticket;
      })
    );
  };
  const onChangeSupport = (id: string, isNeedSupport: boolean) => {
    setDailyScrumTicketData(
      dailyScrumTicketData.map((ticket) => {
        if (ticket.id === id) {
          return { ...ticket, isNeedSupport, supportValidation: true };
        }
        return ticket;
      })
    );
  };
  const onChangeReason = (id: string, reason: string) => {
    setDailyScrumTicketData(
      dailyScrumTicketData.map((ticket) => {
        if (ticket.id === id) {
          return { ...ticket, reason };
        }
        return ticket;
      })
    );
  };
  const onChangeProgress = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setDailyScrumTicketData(
      dailyScrumTicketData.map((ticket) => {
        if (ticket.id === id) {
          return { ...ticket, progress: e.target.valueAsNumber };
        }
        return ticket;
      })
    );
  };
  const onHandleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);

      // createDate is not in a correct format that can be accepted by new Date()
      // useCreateAt instead
      dailyScrumTicketData
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
            await updateDailyScrum(data, projectId, userId, taskId.id);
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
      {dailyScrumTicketData.map(({ id, title, progress, isFinished, finishValidation }) => {
        return (
          <DailyScrumTicket
            key={id}
            id={id}
            title={title}
            progress={progress.toString()}
            finish={isFinished}
            finishValidation={finishValidation as boolean}
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
