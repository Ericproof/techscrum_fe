import React, { useEffect, useState } from 'react';
import style from './CommentItem.module.scss';

interface ICommentItem {
  content: string;
  id: string;
  senderId: {
    email: string;
    createAt: string;
    id: string;
    updatedAt: string;
    name: string;
    avatarIcon: string;
  };
  updatedAt: Date;
  onClickDelete: (id: string) => void;
  onClickUpdate: (id: string, commentContent: string) => void;
  userEmail: string;
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
  const { content, id, senderId, updatedAt, onClickDelete, onClickUpdate, userEmail } = props;
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  const handelOnClickDelete = () => {
    onClickDelete(id);
  };

  useEffect(() => {
    if (isEditMode) {
      setCommentContent(content);
    }
  }, [isEditMode, content]);

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  return (
    <div className={style.container}>
      <img className={style.avatar} src={senderId.avatarIcon} alt={senderId.avatarIcon} />
      <div className={style.commentLayout}>
        <div className={style.commentTitle}>
          <span>{senderId?.name}</span>
          <span>{dateWithTimestamp(updatedAt)}</span>
        </div>
        <div className={style.commentBody}>
          {isEditMode ? (
            <div className={style.commentInputField}>
              <input
                type="text"
                value={commentContent}
                onChange={onChangeComment}
                placeholder="Add a comment..."
              />
            </div>
          ) : (
            <span>{content}</span>
          )}
        </div>
        <div
          className={
            userEmail === senderId.email ? style.commentButtons : style.commentButtonsBlocked
          }
        >
          {!isEditMode ? (
            <button
              type="button"
              className={style.edit}
              onClick={() => {
                setIsEditMode(true);
              }}
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              className={style.edit}
              onClick={() => {
                setIsEditMode(false);
                onClickUpdate(id, commentContent);
              }}
            >
              Save
            </button>
          )}
          <button type="button" className={style.delete} onClick={handelOnClickDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
