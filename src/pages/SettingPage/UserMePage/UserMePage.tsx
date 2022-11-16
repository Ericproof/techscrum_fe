/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateMe } from '../../../api/user/user';
import ChangeIcon from '../../../components/ProjectEditor/ChangeIcon/ChangeIcon';
import { UserContext, UserDispatchContext } from '../../../context/UserInfoProvider';
import Alert from '../../../components/Alert/Alert';
import styles from './UserMePage.module.scss';
import SettingCard from '../../../components/SettingCard/SettingCard';
import InputV2 from '../../../components/FormV2/InputV2/InputV2';
import SubSettingMenu from '../../../components/SubSettingMenu/SubSettingMenu';
import ButtonV2 from '../../../components/FormV2/ButtonV2/ButtonV2';
import Modal from '../../../components/Modal/Modal';
import MainMenuV2 from '../../MainMenuV2/MainMenuV2';

export default function UserMePage() {
  const navigate = useNavigate();
  const [alerVisible, setAlertVisible] = useState(false);
  const [statusCode, setStatusCode] = useState(0);
  const [tip, setTip] = useState('');
  const userInfo = useContext(UserContext);
  const setUserInfo = useContext(UserDispatchContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

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

  const loading = !userInfo || Object.keys(userInfo).length === 0;

  return (
    <>
      <div className={styles.settingPage} data-testid="setting-page">
        <MainMenuV2 />
        <SubSettingMenu />
        <div className={styles.settingContainer}>
          <div className={styles.settingMiniContainer}>
            <header>
              <h1 className={styles.headerText}>User Profile</h1>
              <hr className={styles.divider} />
            </header>
            <SettingCard title="Personal Information">
              <ChangeIcon
                value={
                  userInfo?.avatarIcon ||
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
                }
                uploadSuccess={(photoData: any) => {
                  onChangeUser({ target: { name: 'avatarIcon', value: photoData[0].location } });
                }}
              />
              <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
                <InputV2
                  label="User Name"
                  onValueChanged={onChangeUser}
                  defaultValue={userInfo.userName || ''}
                  name="userName"
                  loading={loading}
                />
                <InputV2
                  label="Full Name"
                  onValueChanged={onChangeUser}
                  defaultValue={userInfo.name || ''}
                  name="fullName"
                  loading={loading}
                />
              </div>
              <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
                <InputV2
                  label="Job Title"
                  onValueChanged={onChangeUser}
                  defaultValue={userInfo.jobTitle || ''}
                  name="jobTitle"
                  loading={loading}
                />
                <InputV2
                  label="Location"
                  onValueChanged={onChangeUser}
                  defaultValue={userInfo.location || ''}
                  name="location"
                  loading={loading}
                />
              </div>
              <ButtonV2 text="Save Changes" onClick={onSaveMe} />
            </SettingCard>
            <SettingCard title="Change Password (WIP)">
              <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
                <InputV2
                  label="New Password"
                  onValueChanged={() => {}}
                  onValueBlur={() => {}}
                  defaultValue=""
                  name="newPassword"
                  type="password"
                />
                <InputV2
                  label="Confirm Password"
                  onValueChanged={() => {}}
                  onValueBlur={() => {}}
                  defaultValue=""
                  name="confirmPassword"
                  type="password"
                />
              </div>
              <ButtonV2 text="Update" onClick={onSaveMe} />
            </SettingCard>
            <SettingCard title="Delete Account (WIP)">
              <p>Delete your account and all of your source data. This is irreversible.</p>
              <ButtonV2
                text="DELETE"
                danger
                size="xs"
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              />
            </SettingCard>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <Modal classesName={styles.modal}>
          <p>Are you sure you want to delete the account?</p>
          <div className={styles.modalBtn}>
            <ButtonV2
              text="Confirm"
              danger
              onClick={() => {
                setSubmitting(true);
              }}
              disabled={submitting}
            />
            <ButtonV2
              text="Cancel"
              fill
              onClick={() => {
                setShowDeleteModal(false);
              }}
            />
          </div>
        </Modal>
      )}
      {alerVisible && (
        <Alert statusCode={statusCode} tipContent={tip} confirmAlert={alertConfirm} />
      )}
    </>
  );
}
