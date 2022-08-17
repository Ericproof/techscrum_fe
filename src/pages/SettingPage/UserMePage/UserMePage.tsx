import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateMe } from '../../../api/user/user';
import ChangeIcon from '../../../components/ProjectEditor/ChangeIcon/ChangeIcon';
import ProjectHeader from '../../../components/ProjectHeader/ProjectHeader';
import { UserContext, UserDispatchContext } from '../../../context/UserInfoProvider';
import Alert from '../../../components/Alert/Alert';
import styles from './UserMePage.module.scss';

export default function UserMePage() {
  const navigate = useNavigate();
  const [alerVisible, setAlertVisible] = useState(false);
  const [statusCode, setStatusCode] = useState(0);
  const [tip, setTip] = useState('');
  const userInfo = useContext(UserContext);
  const setUserInfo = useContext(UserDispatchContext);

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
      setTip('Saved');
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
      <div className={styles.userPageContainer}>
        <div className={styles.userForm}>
          <div className={styles.userBar}>
            <h2>Personal Profile</h2>
          </div>
          <div className={styles.userIconAndInfo}>
            <div className={styles.userIcon}>
              <div className={styles.picBorder}>
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
            <div className={styles.userInfo}>
              <form>
                <div className={styles.userInput}>
                  <label htmlFor="User Name">
                    User Name
                    <br />
                    <input
                      className={styles.proIcon}
                      name="User name"
                      placeholder="User Name"
                      defaultValue={userInfo.userName}
                      onChange={onChangeUser}
                    />
                  </label>
                </div>
                <div className={styles.userInput}>
                  <label htmlFor="Full Name">
                    Full Name
                    <br />
                    <input
                      className={styles.proIcon}
                      name="Full Name"
                      placeholder="Full Name"
                      defaultValue={userInfo.name}
                      onChange={onChangeUser}
                    />
                  </label>
                </div>
                <div className={styles.userInput}>
                  <label htmlFor="Job Title">
                    Job Title
                    <br />
                    <input
                      className={styles.proIcon}
                      name="Job Title"
                      placeholder="Job Title"
                      defaultValue={userInfo.jobTitle}
                      onChange={onChangeUser}
                    />
                  </label>
                </div>
                <div className={styles.userInput}>
                  <label htmlFor="Location">
                    Location
                    <br />
                    <input
                      className={styles.proIcon}
                      name="Location"
                      placeholder="Location"
                      defaultValue={userInfo.location}
                      onChange={onChangeUser}
                    />
                  </label>
                </div>
                <button className={styles.submit} type="button" onClick={onSaveMe}>
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
