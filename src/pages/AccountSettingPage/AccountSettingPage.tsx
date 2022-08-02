import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AccountSettingPage.module.scss';
import AccountSettingHeader from './accountSettingHeader/accountSettingHeader';
import ChangePassword from './changePassword/changePassword';
import DeleteAccount from './deleteAccount/deleteAccount';
import Alert from '../../components/Alert/Alert';

export default function AccountSettingPage() {
  const [statusCode, setStateCode] = useState(0);
  const [tipContent, setTipContent] = useState('');
  const [displayAlert, setDisplayAlert] = useState(false);
  const navigation = useNavigate();

  const alertDisplayHandler = () => {
    setDisplayAlert(!displayAlert);
  };

  const eventHandler = (tip: string, status: number) => {
    setStateCode(status);
    setTipContent(tip);
    setDisplayAlert(true);
    if (status === 0) {
      navigation(`/`);
    }
  };

  return (
    <>
      <AccountSettingHeader />
      {displayAlert && (
        <Alert statusCode={statusCode} tipContent={tipContent} confirmAlert={alertDisplayHandler} />
      )}
      <div className={styles.cards}>
        <ChangePassword changePasswordTipHandler={eventHandler} />
        <DeleteAccount deleteAccountTipHandler={eventHandler} />
      </div>
    </>
  );
}
