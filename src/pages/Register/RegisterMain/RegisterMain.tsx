import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import emailCheck from '../../../api/register/emailCheck';
import register from '../../../api/register/register';
import styles from './RegisterMain.module.scss';
import Icon from '../../../assets/logo.svg';
import GoogleIcon from './google-logo.svg';
import MicrosoftIcon from './microsoft-logo.svg';
import AppleIcon from './apple-logo.svg';

export default function RegisterMain() {
  const queryString = window.location.href.toString().split('?')[1];
  const query = new URLSearchParams(queryString);
  const navigate = useNavigate();
  /* eslint-disable no-useless-escape */
  const illegalCharacter = /[%&]/;

  let emailRecorder =
    query.has('email') && query.get('email') !== null ? query.get('email') ?? '' : '';
  let nameRecorder = '';
  let passwordRecorder = '';

  let emailCheckProcess: boolean =
    query.has('emailCheckProcess') && query.get('emailCheckProcess') !== null
      ? Boolean(query.get('emailCheckProcess')) ?? false
      : false;

  const tip = (error: string) => {
    const tipLabel = document.getElementById('tip') as HTMLInputElement;
    tipLabel.textContent = error;
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!emailCheckProcess) {
      const result = await emailCheck(emailRecorder);
      if (result.result) {
        emailCheckProcess = true;
        navigate(`/register?email=${emailRecorder}&emailCheckProcess=${emailCheckProcess}`);
      } else {
        tip('The email already exists. Please try again');
      }
      return;
    }

    const resResult = await register({
      email: emailRecorder,
      name: nameRecorder,
      password: passwordRecorder
    });

    const { token } = resResult;
    if (token === undefined) {
      tip('Something Go Wrong, Please contact staff!');
    } else {
      localStorage.setItem('token', token);
      navigate(`/`);
    }
  };

  const setEmail = (email: string) => {
    emailRecorder = email;
  };

  const setName = (name: string) => {
    nameRecorder = name;
  };

  const setPassword = (password: string) => {
    if (!illegalCharacter.test(password) || password === '') {
      passwordRecorder = password;
      tip('');
    } else tip('Illegal Character Detected');
  };

  return (
    <div className={styles.registerMain}>
      <img src={Icon} alt="TechScrum Icon" />
      <form onSubmit={handleSubmit}>
        <h1>Register to continue</h1>
        <h1>Your team&apos;s site</h1>
        <p id="tip" />
        <input
          className={styles.email}
          type="email"
          placeholder="Input Email Address"
          name="email"
          defaultValue={emailRecorder}
          onChange={(e) => setEmail(e.target.value)}
          disabled={emailCheckProcess}
          required
        />
        {emailCheckProcess && (
          <>
            <input
              className={styles.password}
              type="text"
              placeholder="Input Your Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className={styles.password}
              type="password"
              placeholder="Input Your Password"
              name="password"
              minLength={8}
              maxLength={16}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
        <p>
          By registering, I accept the{' '}
          <Link to="/terms-of-service">TechScrum Terms of Service</Link> and confirm acceptance of
          the
          <Link to="/privacy-policy"> Privacy Policy.</Link>
        </p>
        <button type="submit">Register</button>
        <p>or</p>
        <div className={styles.btnList}>
          <a href="/#">
            <img src={GoogleIcon} alt="" />
            <span>Keep Using Google</span>
          </a>
          <a href="/#">
            <img src={MicrosoftIcon} alt="" />
            <span>Keep Using Microsoft</span>
          </a>
          <a href="/#">
            <img src={AppleIcon} alt="" />
            <span>Keep Using Apple</span>
          </a>
        </div>
        <div className={styles.formFooter}>
          <Link to="/login">Already have TechScrum Account? Login</Link>
        </div>
      </form>
      <p className={styles.registerMainFooter}>
        This page is protected by reCAPTCHA and complies with Google&apos;s
        <Link to="/privacy-policy"> Privacy Policy</Link> and{' '}
        <Link to="/terms-of-service">Terms of Service</Link>
      </p>
    </div>
  );
}
