/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createActivity } from '../../api/activity/activity';
import styles from './CreateNewCard.module.scss';
import { createNewTask } from '../../api/task/task';
import { ICardData, ILabelData, IProject, IProjectData } from '../../types';
import UserSelect from '../Form/Select/UserSelect/UserSelect';
import { upload } from '../../api/upload/upload';
import Attach from '../BoardCard/CardLeftContent/components/Attach/Attach';
import PhotoGallery from '../PhotoGallery/PhotoGallery';
import { TaskTypesContext } from '../../context/TaskTypeProvider';
import { ProjectContext } from '../../context/ProjectProvider';
import { UserContext } from '../../context/UserInfoProvider';
import Row from '../Grid/Row/Row';
import InputV2 from '../FormV2/InputV2/InputV2';
import DropdownV2 from '../FormV2/DropdownV2/DropdownV2';
import TextAreaV2 from '../FormV2/TextAreaV2/TextAreaV2';
import UsersFieldsV2 from '../FieldsV2/UsersFieldsV2/UsersFieldsV2';
import MultiSelectDropdownV2 from '../FormV2/MultiSelectDropdownV2/MultiSelectDropdownV2';
import LabelFieldsV2 from '../FieldsV2/LabelFieldsV2/LabelFieldsV2';

interface Props {
  fetchNewCard: (newCard: ICardData) => void;
  updateIsCreateNewCard: () => void;
}

function CreateNewCard({ fetchNewCard, updateIsCreateNewCard }: Props) {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [assigneeId, setAssigneeId] = useState<any>(null);
  const [hasError, setError] = useState(false);
  const [photoData, setPhotoData] = useState<any>([]);
  const [taskTypeId, setTaskTypeId] = useState<string>();
  const { boardId = '', projectId = '' } = useParams();
  const taskType = useContext(TaskTypesContext);
  const projectList = useContext<IProject[]>(ProjectContext);
  const currentProject: IProjectData[] = projectList.filter(
    (project: IProjectData) => project.id === projectId
  );
  const userInfo = useContext(UserContext);

  useEffect(() => {
    if (!taskType) {
      return;
    }
    setTaskTypeId(taskType[0].id);
  }, [taskType]);

  const data = useState<ICardData>({
    dueAt: new Date(),
    title: ''
  });

  const onChangeAssigneeId = (e: any) => {
    setAssigneeId(e.target.value);
  };

  const onChangeTaskType = (e: any) => {
    setTaskTypeId(e.target.value);
  };

  const changeDescriptionHandler = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const uploadSuccess = (newPhotoData: any) => {
    const updatePhotoData = [...photoData, newPhotoData[0].location];
    setPhotoData(updatePhotoData);
  };

  const uploadFile = (e: any) => {
    const uploadData = new FormData();
    uploadData.append('photos', e.target.files[0]);
    upload(uploadData).then((res: any) => {
      uploadSuccess(res.data);
    });
  };

  const onSave = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newCard = {
      ...data[0],
      description,
      title,
      boardId,
      projectId,
      tag: [],
      typeId: taskTypeId,
      assignId: assigneeId?.id,
      attachmentUrls: photoData
    };

    createNewTask(newCard)
      .then((res) => {
        if (res.status === 201) {
          setError(false);
          const operation = 'created';
          const userId = userInfo?.id;
          const taskId = res.data.id;
          createActivity({ operation, userId, taskId });
          fetchNewCard({ ...res.data, statusId: res.data.status });
          return;
        }
        setError(true);
      })
      .catch(() => {
        setError(true);
      });
  };

  const removeAttachment = (url: string) => {
    const updatePhotoData = photoData.filter((photoUrl: string) => {
      return photoUrl !== url;
    });
    setPhotoData(updatePhotoData);
  };

  return (
    <div className="defaultHeaderModalPadding">
      <form onSubmit={onSave}>
        <Row defaultMargin>
          <InputV2 label="Title" name="title" onValueChanged={changeTitleHandler} defaultValue="" />
        </Row>
        <Row defaultMargin defaultGap>
          <DropdownV2
            label="Card Type"
            name="type"
            onValueChanged={onChangeTaskType}
            defaultValue={taskType[0].name}
            options={taskType.map((item) => {
              return { value: item.id, label: item.name };
            })}
          />
          <DropdownV2
            label="Status"
            name="status"
            onValueChanged={() => {}}
            defaultValue="High"
            options={[
              { value: 'High', label: 'High' },
              { value: 'Medium', label: 'Medium' },
              { value: 'Low', label: 'Low' }
            ]}
          />
        </Row>
        <Row defaultGap>
          {/* <MultiSelectDropdownV2
            label="Labels"
            name="labels"
            onValueChanged={() => {}}
            options={[]}
          /> */}
          <LabelFieldsV2 taskInfo={null} isDisabled={false} updateTaskTags={() => {}} />
          <UsersFieldsV2
            onChange={onChangeAssigneeId}
            defaultValue={null}
            label="Assignee"
            name="assignee"
          />
        </Row>
        <Attach onChangeAttachment={uploadFile} />
        <PhotoGallery photoData={photoData} removeAttachment={removeAttachment} />
        <TextAreaV2
          label="Description"
          onValueChanged={changeDescriptionHandler}
          defaultValue={description}
          name="description"
        />
        <div className={styles.cardButton}>
          <button
            type="button"
            className={styles.cancelButton}
            name="close"
            onClick={updateIsCreateNewCard}
          >
            Cancel
          </button>
          <button type="submit" className={styles.createButton} data-testid="create-issue">
            Create
          </button>
        </div>
        {/* <div className={styles.cardContent}>
          <p className={styles.cardStar}>Project</p>
          <input className={styles.cardInput} disabled defaultValue={currentProject[0].name} />
          <p className={styles.cardStar}>Card type</p>
          <select className={styles.cardSelect} onChange={onChangeTaskType}>
            {taskType.map((item: any) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <p className={styles.cardStar}>Summary</p>
          <input
            className={styles.cardInput}
            type="text"
            value={title}
            onChange={changeTitleHandler}
            data-testid="summary"
            required
          />
          <p className={styles.cardLabel}>Attachment</p>

          <p className={styles.cardLabel}>Description</p>

          <p className={styles.cardLabel}>Assignee</p>
          <UserSelect onChange={onChangeAssigneeId} value={assigneeId} allowEdit />
          <p className={styles.cardLabel} style={{ display: 'none' }}>
            Priority
          </p>
          <select className={styles.cardSelect} style={{ display: 'none' }}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <p className={styles.cardLabel} style={{ display: 'none' }}>
            Labels
          </p>
          <select
            className={styles.cardSelect}
            placeholder="select Label"
            style={{ display: 'none' }}
          >
            <option value="backend">backend</option>
            <option value="frontend">frontend</option>
          </select>
        </div>
        {hasError && <p className={styles.error}>Error</p>}
        <div className={styles.cardButton}>
          <button
            type="button"
            className={styles.cancelButton}
            name="close"
            onClick={updateIsCreateNewCard}
          >
            Cancel
          </button>
          <button type="submit" className={styles.createButton} data-testid="create-issue">
            Create
          </button>
        </div> */}
      </form>
    </div>
  );
}

export default CreateNewCard;
