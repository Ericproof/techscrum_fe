import React, { useEffect, useState } from 'react';
import {
  createComment,
  getCommit,
  deleteCommit,
  updateCommit
} from '../../../../../api/commit/commits';
import { ICommentData, ICommentItemData } from '../../../../../types';
import checkAccess from '../../../../../utils/helpers';
import CommentItem from './components/CommentItem/CommentItem';
import style from './LeftBottom.module.scss';

interface ILeftBottom {
  userId?: string;
  taskId?: string;
  userEmail?: string;
  projectId: string;
}

export default function LeftBottom(props: ILeftBottom) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const { userId = '', taskId = '', userEmail = '', projectId } = props;
  const [comments, setComments] = useState([]);
  const [saveState, setSaveState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onFocusEventHandler = () => setVisible(true);

  const fetchCommentsData = () => {
    async function fetchData() {
      await getCommit().then((data: ICommentData) => {
        const result = data.data.reverse();
        setComments(result);
      });
    }
    fetchData();
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onClickDelete = async (id: string) => {
    await deleteCommit(id);
    setDeleteState(true);
  };

  const onClickUpdate = async (id: string, commentContent: string) => {
    await updateCommit(id, commentContent);
    setUpdateState(true);
  };

  const onClickSave = async () => {
    await createComment({ taskId, senderId: userId, content });
    setSaveState(true);
    setVisible(false);
    setContent('');
  };

  useEffect(() => {
    if (isLoading) {
      fetchCommentsData();
      setIsLoading(false);
    }
    if (saveState) {
      fetchCommentsData();
      setSaveState(false);
    }

    if (deleteState) {
      fetchCommentsData();
      setDeleteState(false);
    }
    if (updateState) {
      fetchCommentsData();
      setUpdateState(false);
    }
  }, [isLoading, saveState, deleteState, updateState]);

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
      {checkAccess('edit:tasks', projectId) && (
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
      )}
      {comments.map((item: ICommentItemData) => {
        if (item.taskId === taskId) {
          return (
            <CommentItem
              key={item.id}
              content={item.content}
              id={item.id}
              senderId={item.senderId}
              updatedAt={item.updatedAt}
              onClickDelete={onClickDelete}
              onClickUpdate={onClickUpdate}
              userEmail={userEmail}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

LeftBottom.defaultProps = {
  taskId: undefined,
  userId: undefined,
  userEmail: undefined
};
