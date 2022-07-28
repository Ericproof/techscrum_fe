import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateMe } from '../../../api/user/user';
import ChangeIcon from '../../../components/ProjectEditor/ChangeIcon/ChangeIcon';
import ProjectHeader from '../../../components/ProjectHeader/ProjectHeader';
import { UserContext, UserDispatchContext } from '../../../context/UserInfoProvider';
import { IProject } from '../../../types';
import Alert from '../../../components/Alert/Alert';
// import icon from './pic.jpg';
import styles from './UserMePage.module.scss';

export default function UserMePage() {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const [value, setValue] = useState(0);
  const [isCreateNewCard, setIsCreateNewCard] = useState(false);
  const [alerVisible, setAlertVisible] = useState(false);
  const [statusCode, setStatusCode] = useState(0);
  const [tip, setTip] = useState('');
  const userInfo = useContext(UserContext);
  const setUserInfo = useContext(UserDispatchContext);
  const getProjectFromChildren = (id: number) => {
    projectList[id].star = !projectList[id].star;
    setValue(value + 1);
  };
  const getCreateNewCardStateFromChildren = () => {
    setIsCreateNewCard(!isCreateNewCard);
  };

  const onChangeUser = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSaveMe = async () => {
    if (!userInfo.token) {
      return;
    }

    try {
      await updateMe(
        {
          name: userInfo.name,
          avatarIcon: userInfo?.avatarIcon,
          userName: userInfo.userName,
          abbreviation: userInfo.abbreviation,
          jobTitle: userInfo.jobTitle,
          location: userInfo.location
        },
        userInfo.token
      );

      setStatusCode(0);
      setTip('Success');
      setAlertVisible(true);
    } catch (e) {
      setStatusCode(1);
      setTip('Something go Wrong');
      setAlertVisible(true);
    }
  };

  const alertConfirm = () => {
    setAlertVisible(false);
    if (statusCode === 0) navigate('/projects');
  };

  return (
    <>
      {alerVisible && (
        <Alert statusCode={statusCode} tipContent={tip} confirmAlert={alertConfirm} />
      )}
      <ProjectHeader />
      <div className={styles.userPage}>
        <div className={styles.userBar}>
          <h2>About</h2>
        </div>
        <div className={styles.userForm}>
          <div className={styles.userInfo}>
            <form>
              <div className={styles.userInput}>
                <label htmlFor="Name">
                  Full Name
                  <br />
                  <input
                    className={styles.proIcon}
                    name="name"
                    value={userInfo.name}
                    onChange={onChangeUser}
                  />
                </label>
              </div>
              <div className={styles.userInput}>
                <label htmlFor="jobTitle">
                  Job Title
                  <br />
                  <input
                    className={styles.proIcon}
                    name="jobTitle"
                    value={userInfo.jobTitle}
                    onChange={onChangeUser}
                  />
                </label>
              </div>
              <div className={styles.userInput}>
                <label htmlFor="location">
                  Location
                  <br />
                  <input
                    className={styles.proIcon}
                    name="location"
                    value={userInfo.location}
                    onChange={onChangeUser}
                  />
                </label>
              </div>
              <div className={styles.userInput}>
                <label htmlFor="userName">
                  Username
                  <br />
                  <input
                    className={styles.proIcon}
                    name="userName"
                    value={userInfo.userName}
                    onChange={onChangeUser}
                  />
                </label>
              </div>
              <input className={styles.submit} type="button" value="Save" onClick={onSaveMe} />
            </form>
          </div>
          <div className={styles.userIcon}>
            <div className={styles.picBorder}>
              <h2>Photo</h2>
              <ChangeIcon
                value={
                  userInfo?.avatarIcon ||
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
                }
                uploadSuccess={(photoData: any) => {
                  onChangeUser({ target: { name: 'avatarIcon', value: photoData[0].location } });
                }}
              />
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
