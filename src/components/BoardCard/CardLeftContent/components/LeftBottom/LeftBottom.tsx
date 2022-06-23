import React from 'react';
import CommentItem from './components/CommentItem/CommentItem';
import style from './LeftBottom.module.scss';

export default function LeftBottom() {
  return (
    <div className={style.container}>
      <div className={style.activity}>
        <h3>Activity</h3>
        <div className={style.showCommentButton}>
          <span>Show: </span>
          <button type="button">Comments</button>
        </div>
      </div>

      <div className={style.commentInputField}>
        <span role="img" className={style.avatar} />
        <input type="text" placeholder="Add a comment..." />
      </div>
      <CommentItem />
      <CommentItem />
    </div>
  );
}
