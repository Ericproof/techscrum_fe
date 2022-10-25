import React from 'react';
import style from './Activity.module.scss';

interface ICommentItem {
  id: string;
  userId: {
    email: string;
    createAt: string;
    id: string;
    updatedAt: string;
    name: string;
    avatarIcon: string;
  };
  operation: string;
  createdAt: Date;
}

const dateHandler = (fullDate) => {
  const dateAndTime = fullDate.split('T');
  const date = dateAndTime[0];
  const YearMonthDay = date.split('-');
  const year = YearMonthDay[0];
  let month = YearMonthDay[1];
  const day = YearMonthDay[2];
  let result = '';
  const monthObj = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
  };
  month = monthObj[month];
  const time = dateAndTime[1];
  const trueTime = time.split('.');
  let hourMinSec = trueTime[0];
  hourMinSec = hourMinSec.split(':');
  const hour = hourMinSec[0];
  const min = hourMinSec[1];
  let resultTime = '';
  if (hour <= 12) {
    resultTime = ` ${hour}:${min} AM`;
  } else {
    const newHour = Number(hour) - 12;
    if (newHour < 10) {
      resultTime = `0${newHour}:${min} PM`;
    } else {
      resultTime = `${newHour}:${min} PM`;
    }
  }

  result = `${month} ${day}, ${year} at ${resultTime}`;
  return result;
};

export default function ActivityItem(props: ICommentItem) {
  const { id, userId, operation, createdAt } = props;
  return (
    <div id={id} className={style.container}>
      <div className={style.userContainer}>
        <img className={style.avatar} src={userId.avatarIcon} alt={userId.avatarIcon} />
        <p>{userId.name}</p>
      </div>
      <div>
        <p>
          {operation} {dateHandler(createdAt)}
        </p>
      </div>
    </div>
  );
}
