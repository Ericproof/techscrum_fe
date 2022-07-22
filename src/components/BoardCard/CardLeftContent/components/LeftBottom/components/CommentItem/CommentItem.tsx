import React, { useEffect, useState } from 'react';
import { deleteCommit, updateCommit } from '../../../../../../../api/commit/commits';
import style from './CommentItem.module.scss';

interface ICommentItem {
  content: string;
  id: string;
  senderId: any;
  updatedAt: Date;
}
const monthShortNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
const dateWithTimestamp = (d: Date | null) => {
  if (d != null) {
    const date = d.toString().split('T')[0];
    const dateDataArray = date.split('-');
    const time = d.toString().split('T')[1].split(':');
    const hour = Number(time[0]);
    time[0] = hour > 12 ? `${hour - 12}` : `${hour}`;
    const period = hour < 12 ? 'AM' : 'PM';
    return `${monthShortNames[Number(dateDataArray[1]) - 1]} ${dateDataArray[2]}, ${
      dateDataArray[0]
    } at ${time[0]}:${time[1]} ${period}`;
  }
  return '';
};

export default function CommentItem(props: ICommentItem) {
  const { content, id, senderId, updatedAt } = props;
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const onClickDelete = () => {
    deleteCommit(id);
  };
  const onClickUpdate = () => {
    updateCommit(id, commentContent);
  };

  useEffect(() => {
    if (isEditMode) {
      setCommentContent(content);
    }
  }, [isEditMode, content]);

  const onChangeComment = (e: any) => {
    setCommentContent(e.target.value);
  };

  return (
    <div className={style.container}>
      <span role="img" className={style.avatar} />
      <div className={style.commentLayout}>
        <div className={style.commentTitle}>
          <span>{senderId?.name}</span>
          <span>{dateWithTimestamp(updatedAt)}</span>
        </div>
        <div className={style.commentBody}>
          {isEditMode ? (
            <input type="text" value={commentContent} onChange={onChangeComment} />
          ) : (
            <span>{content}</span>
          )}
        </div>
        <div className={style.commentButtons}>
          {!isEditMode && (
            <button
              type="button"
              className={style.edit}
              onClick={() => {
                setIsEditMode(true);
              }}
            >
              Edit
            </button>
          )}
          {isEditMode && (
            <button
              type="button"
              className={style.edit}
              onClick={() => {
                setIsEditMode(false);
                onClickUpdate();
                // update ui
              }}
            >
              Save
            </button>
          )}
          <button type="button" className={style.delete} onClick={onClickDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
