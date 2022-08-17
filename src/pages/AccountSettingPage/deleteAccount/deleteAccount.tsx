import React, { useState } from 'react';
import deleteAccount from '../../../api/accountSetting/deleteAccount';
import styles from './deleteAccount.module.scss';

interface Props {
  deleteAccountTipHandler: (tip: string, statusCode: number) => void;
}

export default function DeleteAccount({ deleteAccountTipHandler }: Props) {
  const [password, setPassword] = useState('');

  const fetchPassword = (input: string) => {
    setPassword(input);
  };

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const result = await deleteAccount({
        password
      });

      if (result.status === 204) {
        localStorage.removeItem('access_token');
        deleteAccountTipHandler('Success', 0);
        return;
      }
      if (result.status === 403) {
        deleteAccountTipHandler('Validation Error', 1);
        return;
      }
      if (result.status === 404) {
        deleteAccountTipHandler('Cannot Connect Service', 1);
        return;
      }
      if (result.status === 406) {
        deleteAccountTipHandler('Wrong Password', 1);
        return;
      }
      deleteAccountTipHandler('Unknown Error, Please contact administrator', 1);
    } catch (e) {
      deleteAccountTipHandler('Unknown Error, Please contact administrator', 1);
    }
  };

  return (
    <div className={styles.deleteAccountContainer}>
      <div className={styles.accountHeader}>
        <h3>Account Settings</h3>
      </div>
      <div className={styles.accountSettingContent}>
        <div className={styles.accountSidebar}>
          <h4>Change Password</h4>
          <h4>Notifications</h4>
          <h4>Others</h4>
          <hr />
          <button type="button" className={styles.deleteButton}>
            Delete Account
          </button>
        </div>
        <div className={styles.deleteRightContent}>
          <h3>We are sorry to see you go</h3>
          <h4>
            If you’d like to reduce your email notifications, you can disable them here or if you
            just want to change your username, you can do that here. Be advised, account deletion is
            final. There will be no way to restore your account.
          </h4>
          <p>Password</p>
          <form onSubmit={submitHandler}>
            <input
              className={styles.passwordInput}
              type="password"
              placeholder="Enter Password"
              onChange={(e) => fetchPassword(e.target.value)}
              required
            />
            <p className={styles.deleteCaution}>Enter the password to delete your account.</p>
            <button type="submit">Delete Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
