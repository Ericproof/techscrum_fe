import React, { useEffect, useState } from 'react';
import { MentionData } from '@draft-js-plugins/mention';
import {
  createComment,
  getComment,
  deleteComment,
  updateComment
} from '../../../../../api/comment/comment';
import { getUsers } from '../../../../../api/user/user';
import { ICommentData, ICommentItemData } from '../../../../../types';
import checkAccess from '../../../../../utils/helpers';
import CommentItem from './components/CommentItem/CommentItem';
import Editor from './components/Editor/Editor';
import style from './LeftBottom.module.scss';

interface ILeftBottom {
  userId?: string;
  taskId?: string;
  userEmail?: string;
  projectId: string;
}
export default function LeftBottom(props: ILeftBottom) {
  const { userId = '', taskId = '', userEmail = '', projectId } = props;
  const [comments, setComments] = useState([]);
  const [saveState, setSaveState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [users, setUsers] = useState<MentionData[]>([]);

  const fetchCommentsData = () => {
    async function fetchData() {
      await getComment().then((data: ICommentData) => {
        const result = data.data.reverse();
        setComments(result);
      });
    }
    fetchData();
  };

  const onClickDelete = async (id: string) => {
    await deleteComment(id);
    setDeleteState(true);
  };

  const onClickUpdate = async (id: string, commentContent: string) => {
    await updateComment(id, commentContent);
    setUpdateState(true);
  };

  const onClickPublish = async (content) => {
    setSubmitting(true);
    await createComment({ taskId, senderId: userId, content });
    setSaveState(true);
    setSubmitting(false);
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

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers();
      if (Array.isArray(res.data)) {
        const usersArray = res.data.map((item) => {
          return {
            name: item.name,
            avatar: item.avatarIcon
          };
        });
        setUsers(usersArray);
      }
    };
    fetchUsers();
  }, []);

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
          <div className={style.commentInputField}>
            <Editor
              submitting={submitting}
              onClickPublish={onClickPublish}
              users={users}
              imageInputId="insertImage"
            />
          </div>
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
              users={users}
              submitting={submitting}
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
