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
  if (month === '01') {
    month = 'Jan';
  }
  if (month === '02') {
    month = 'Feb';
  }
  if (month === '03') {
    month = 'Mar';
  }
  if (month === '04') {
    month = 'Apr';
  }
  if (month === '05') {
    month = 'May';
  }
  if (month === '06') {
    month = 'Jun';
  }
  if (month === '7') {
    month = 'Jul';
  }
  if (month === '08') {
    month = 'Aug';
  }
  if (month === '09') {
    month = 'Sep';
  }
  if (month === '10') {
    month = 'Oct';
  }
  if (month === '11') {
    month = 'Nov';
  }
  if (month === '12') {
    month = 'Dec';
  }
  const time = dateAndTime[1];
  const trueTime = time.split('.');
  let hourMinSec = trueTime[0];
  hourMinSec = hourMinSec.split(':');
  const hour = hourMinSec[0];
  const min = hourMinSec[1];
  let resultTime = '';
  if (hour <= 12) {
    resultTime = `${hour}:${min} AM`;
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
