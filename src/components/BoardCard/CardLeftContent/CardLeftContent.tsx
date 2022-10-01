import React, { useContext, useEffect, useState } from 'react';
import { TaskEntity } from '../../../api/task/entity/task';
import { UserContext } from '../../../context/UserInfoProvider';
import checkAccess from '../../../utils/helpers';
import PhotoGallery from '../../PhotoGallery/PhotoGallery';
import style from './CardLeftContent.module.scss';
import Attach from './components/Attach/Attach';
import Description from './components/Description/Description';
import LeftBottom from './components/LeftBottom/LeftBottom';
import Title from './components/Title/Title';

interface Props {
  taskInfo: TaskEntity;
  onSave: (updatedTaskInfo: TaskEntity) => void;
  removeAttachment: (url: string) => void;
  uploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  projectId: string;
}

export default function CardLeftContent({
  taskInfo,
  onSave,
  removeAttachment,
  uploadFile,
  projectId
}: Props) {
  const [visible, setVisible] = useState(false);
  const userInfo = useContext(UserContext);
  const [desc, setDesc] = useState<string | undefined>('');
  const [title, setTitle] = useState<string | undefined>('');

  useEffect(() => {
    setTitle(taskInfo.title);
    setDesc(taskInfo.description);
  }, [taskInfo]);

  const onFocusEventHandler = () => setVisible(true);
  const onSaveProcessing = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTaskInfo = { ...taskInfo, title, description: desc };
    onSave(updatedTaskInfo);
    setVisible(false);
  };
  const onResetHandler = () => setVisible(false);

  const onChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    const updatedTaskInfo = { ...taskInfo, title: e.target.value, description: desc };
    onSave(updatedTaskInfo);
  };

  return (
    <div className={style.container}>
      <form onSubmit={onSaveProcessing} onReset={onResetHandler} id="task-form">
        <Title
          taskInfo={taskInfo}
          focusEventHandler={onFocusEventHandler}
          isDisabled={!checkAccess('edit:tasks', projectId)}
          onChangeTitle={onChangeTitle}
          value={title}
        />
        {checkAccess('edit:tasks', projectId) && <Attach onChangeAttachment={uploadFile} />}
        <PhotoGallery
          photoData={taskInfo.attachmentUrls}
          removeAttachment={removeAttachment}
          isDisabled={!checkAccess('edit:tasks', projectId)}
        />
        <Description
          taskInfo={taskInfo}
          focusEventHandler={onFocusEventHandler}
          isDisabled={!checkAccess('edit:tasks', projectId)}
          onChangeDesc={onChangeDesc}
          value={desc}
        />
        {visible && (
          <div className={style.footerContent}>
            <button className={style.saveButton} type="submit">
              <span>Save</span>
            </button>
            <button className={style.cancelButton} type="reset">
              <span>Cancel</span>
            </button>
          </div>
        )}
        <LeftBottom
          taskId={taskInfo.id}
          userId={userInfo.id}
          userEmail={userInfo?.email}
          projectId={projectId}
          userInfo={userInfo}
        />
      </form>
    </div>
  );
}
