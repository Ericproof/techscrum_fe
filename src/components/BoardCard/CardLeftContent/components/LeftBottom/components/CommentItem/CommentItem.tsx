import React, { useEffect, useState } from 'react';
import { deleteCommit } from '../../../../../../../api/commit/commits';
import style from './CommentItem.module.scss';

interface ICommentItem {
  content: string;
  id: string;
  senderId: any;
  updatedAt: string;
}

export default function CommentItem(props: ICommentItem) {
  const { content, id, senderId, updatedAt } = props;
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const onClickDelete = () => {
    deleteCommit(id);
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
          <span>{senderId?.email}</span>
          <span>{updatedAt}</span>
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
                // call api
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
