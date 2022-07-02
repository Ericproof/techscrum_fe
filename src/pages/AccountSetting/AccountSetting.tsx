import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AccountSetting.module.scss';
import AccountSettingHeader from './accountSettingHeader/accountSettingHeader';
import ChangePassword from './changePassword/changePassword';
import DeleteAccount from './deleteAccount/deleteAccount';
import Alert from '../../components/Alert/alert';

export default function AccountSetting() {
  const [statusCode, setStateCode] = useState(0);
  const [tipContent, setTipContent] = useState('');
  const [displayAlert, setDiaplayAlert] = useState(false);
  const navigation = useNavigate();

  const alertDiaplayHandler = () => {
    setDiaplayAlert(!displayAlert);
  };

  const eventHandler = (tip: string, status: number) => {
    setStateCode(status);
    setTipContent(tip);
    setDiaplayAlert(true);
    if (status === 0) {
      navigation(`/`);
    }
  };

  return (
    <>
      <AccountSettingHeader />
      {displayAlert && (
        <Alert statusCode={statusCode} tipContent={tipContent} confirmAlert={alertDiaplayHandler} />
      )}
      <div className={styles.cards}>
        <ChangePassword changePasswordTipHandler={eventHandler} />
        <DeleteAccount deleteAccountTipHandler={eventHandler} />
      </div>
    </>
  );
}
