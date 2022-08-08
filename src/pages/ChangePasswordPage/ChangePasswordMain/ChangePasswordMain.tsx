import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './ChangePasswordMain.module.scss';
import Icon from '../../../assets/logo.svg';
import Error from '../../../assets/error.png';
import Loading from '../../../components/Loading/Loading';
import { getResetPasswordApplication, setPassword } from '../../../api/resetPassword/resetPassword';
import { IResetPasswordForm } from '../../../types';
import Alert from '../../../components/Alert/Alert';

export default function RegisterMain() {
  const navigate = useNavigate();
  /* eslint-disable no-useless-escape */
  const illegalCharacter = /[%&]/;
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [changePasswordForm, setChangePasswordForm] = useState<IResetPasswordForm>({
    email: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [invalideTokenStatus, setInvalideTokenStatus] = useState(false);
  const [tip, setTip] = useState('');
  const [alert, setAlert] = useState(false);
  const [statusCode, setStatusCode] = useState(0);
  const [tipContent, setTipContent] = useState('');

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        setLoading(true);
        const result = await getResetPasswordApplication(token ?? '');
        setChangePasswordForm({ ...result.data });
      } catch (e) {
        setInvalideTokenStatus(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUserEmail();
  }, [token]);

  const handleSubmit = async () => {
    const illegalTestResult = illegalCharacter.test(passwordForm.password);
    if (illegalTestResult) return setTip('Illegal Character Detected');
    if (passwordForm.password !== passwordForm.confirmPassword)
      return setTip('Confirm Password is difference with password');
    setLoading(true);
    try {
      await setPassword(token ?? '', passwordForm.password);
      setStatusCode(0);
      setTipContent('Password has been changed');
    } catch (e) {
      setStatusCode(1);
      setTipContent('Something go Wrong, please try again');
    } finally {
      setLoading(false);
      setAlert(true);
    }
    return true;
  };

  const alertConfirmEventHandler = () => {
    setAlert(false);
    if (statusCode === 0) navigate('/login');
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      const illegalTestResult = illegalCharacter.test(e.target.value);
      if (illegalTestResult) return setTip('Illegal Character Detected');
    }

    if (e.target.name === 'confirmPassword') {
      if (passwordForm.password !== e.target.value)
        return setTip('Confirm Password is difference with password');
    }
    return setTip('');
  };

  if (loading) {
    return <Loading />;
  }
  if (invalideTokenStatus) {
    return <div />;
  }
  return (
    <div className={styles.changePasswordMain}>
      <img src={Icon} alt="TechScrum Icon" />
      <form onSubmit={handleSubmit}>
        {invalideTokenStatus ? (
          <>
            <img src={Error} alt="Error Icon" />
            <p>Invalide Link</p>
          </>
        ) : (
          <>
            <h1>Forget Password</h1>
            <input
              className={styles.email}
              type="text"
              name="email"
              defaultValue={changePasswordForm.email}
              onChange={onChangeHandler}
              disabled
              required
              data-testid="email"
            />

            <input
              className={styles.email}
              type="password"
              placeholder="Enter New Password"
              name="password"
              defaultValue={passwordForm.password}
              onChange={onChangeHandler}
              required
              data-testid="password"
            />

            <input
              className={styles.email}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              defaultValue={passwordForm.confirmPassword}
              onChange={onChangeHandler}
              required
              data-testid="confirmPassword"
            />
            <p id="tip" data-testid="tip">
              {tip}
            </p>
            <button type="submit" data-testid="confirm">
              Confirm
            </button>
          </>
        )}
      </form>

      {alert && (
        <Alert
          statusCode={statusCode}
          tipContent={tipContent}
          confirmAlert={alertConfirmEventHandler}
        />
      )}
    </div>
  );
}
