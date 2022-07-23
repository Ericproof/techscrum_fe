import React from 'react';
import style from './CommentItem.module.scss';

export default function CommentItem() {
  return (
    <div className={style.container}>
      <span role="img" className={style.avatar} />
      <div className={style.commentLayout}>
        <div className={style.commentTitle}>
          <span>Evan Lin</span>
          <span>57 minutes ago</span>
        </div>
        <div className={style.commentBody}>
          <span>Comment 1</span>
        </div>
        <div className={style.commentButtons}>
          <button type="button" className={style.edit}>
            Edit
          </button>
          <button type="button" className={style.delete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
