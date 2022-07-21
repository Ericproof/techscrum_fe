import React, { useState } from 'react';
import CommentItem from './components/CommentItem/CommentItem';
import style from './LeftBottom.module.scss';

export default function LeftBottom() {
  const [visible, setVisible] = useState(false);
  const onFocusEventHandler = () => setVisible(true);
  const onSaveProcessing = () => setVisible(false);
  const onResetHandler = () => setVisible(false);
  return (
    <div className={style.container}>
      <div className={style.activity}>
        <h3>Activity</h3>
        <div className={style.showCommentButton}>
          <span>Show: </span>
          <button type="button">Comments</button>
        </div>
      </div>
      <div>
        <div className={style.commentInputField} onFocus={onFocusEventHandler}>
          <span role="img" className={style.avatar} />
          <input type="text" placeholder="Add a comment..." />
        </div>
        {visible && (
          <div className={style.commentButton}>
            <button className={style.saveButton} type="submit">
              <span>Save</span>
            </button>
            <button className={style.cancelButton} type="reset">
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>
      <CommentItem />
      <CommentItem />
    </div>
  );
}
