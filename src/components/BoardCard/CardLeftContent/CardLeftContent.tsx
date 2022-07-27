import React, { useContext, useState } from 'react';
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
  uploadFile: (e: any) => void;
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

  const onFocusEventHandler = () => setVisible(true);
  const onSaveProcessing = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = (form[0] as HTMLInputElement).value;
    const description = (form[2] as HTMLTextAreaElement).value;
    const updatedTaskInfo = { ...taskInfo, title, description };
    onSave(updatedTaskInfo);
    setVisible(false);
  };
  const onResetHandler = () => setVisible(false);

  return (
    <div className={style.container}>
      <form onSubmit={onSaveProcessing} onReset={onResetHandler} id="task-form">
        <Title
          taskInfo={taskInfo}
          focusEventHandler={onFocusEventHandler}
          isDisabled={!checkAccess('edit:tasks', projectId)}
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
        />
      </form>
    </div>
  );
}
