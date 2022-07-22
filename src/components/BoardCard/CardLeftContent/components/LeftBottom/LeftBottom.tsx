import React, { useState } from 'react';
import { createComment } from '../../../../../api/commit/commits';
import CommentItem from './components/CommentItem/CommentItem';
import style from './LeftBottom.module.scss';

interface ILeftBottom {
  userId?: string;
  taskId?: string;
  comments: any;
}

export default function LeftBottom(props: ILeftBottom) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const { userId = '', taskId = '', comments = [] } = props;
  const onFocusEventHandler = () => setVisible(true);
  const onClickSave = () => {
    createComment({ taskId, senderId: userId, content });
    setVisible(false);
  };

  const onChangeContent = (e: any) => {
    setContent(e.target.value);
  };

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
          <input
            value={content}
            onChange={onChangeContent}
            type="text"
            placeholder="Add a comment..."
          />
        </div>
        {visible && (
          <div className={style.commentButton}>
            <button className={style.saveButton} type="button" onClick={onClickSave}>
              <span>Save</span>
            </button>
            <button className={style.cancelButton} type="reset" onClick={onResetHandler}>
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>
      {comments.map((item: any) => {
        return (
          <CommentItem
            key={item.id}
            content={item.content}
            id={item.id}
            senderId={item.senderId}
            updatedAt={item.updatedAt}
          />
        );
      })}
    </div>
  );
}

LeftBottom.defaultProps = {
  taskId: undefined,
  userId: undefined
};
