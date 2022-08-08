import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ForgetPasswordMain.module.scss';
import Icon from '../../../assets/logo.svg';
import Loading from '../../../components/Loading/Loading';
import { forgetPasswordApply } from '../../../api/forgetPassword/forgetPassword';
import ForgetPasswordResult from './ForgetPasswordResult/ForgetPasswordResult';

export default function RegisterMain() {
  const [forgetPasswordForm, setForgetPasswordForm] = useState({
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [applyStatus, setApplyStatus] = useState(false);
  const [applySuccessStatus, setApplySuccessStatus] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await forgetPasswordApply(forgetPasswordForm);
      setApplySuccessStatus(true);
    } catch (e) {
      setApplySuccessStatus(false);
    } finally {
      setApplyStatus(true);
      setLoading(false);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgetPasswordForm({ ...forgetPasswordForm, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.registerMain}>
      <img src={Icon} alt="TechScrum Icon" />
      <form onSubmit={handleSubmit}>
        {applyStatus ? (
          <ForgetPasswordResult successFlag={applySuccessStatus} />
        ) : (
          <>
            <h1>Forget Password</h1>
            <input
              className={styles.email}
              type="email"
              placeholder="Enter email address"
              name="email"
              defaultValue={forgetPasswordForm.email}
              onChange={onChangeHandler}
              required
              data-testid="email"
            />
            <button type="submit" data-testid="next">
              Next
            </button>
            <div className={styles.formFooter}>
              <Link to="/login">Login</Link>
            </div>
          </>
        )}
      </form>

      <p className={styles.registerMainFooter}>
        <Link to="/privacy-policy" target="_blank">
          Privacy Policy
        </Link>
        &nbsp;and&nbsp;
        <Link to="/terms-of-service" target="_blank">
          Terms of Service
        </Link>
      </p>
    </div>
  );
}
