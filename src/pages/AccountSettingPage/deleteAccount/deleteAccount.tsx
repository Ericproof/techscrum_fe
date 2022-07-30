import React, { useState } from 'react';
import deleteAccount from '../../../api/accountSetting/deleteAccount';

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
    <div>
      <h2>Delete Account</h2>
      <form onSubmit={submitHandler}>
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => fetchPassword(e.target.value)}
          required
        />
        <p>Enter the password to delete the account.</p>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}
