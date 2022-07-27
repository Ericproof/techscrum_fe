import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineVisibility, MdVisibility } from 'react-icons/md';
import login from '../../../api/login/login';
import { IUserInfo } from '../../../types';
import { UserDispatchContext } from '../../../context/UserInfoProvider';
import styles from './LoginMain.module.scss';
import Icon from '../../../assets/logo.svg';
import Loading from '../../../components/Loading/Loading';
import { projectRolesToObject } from '../../../utils/helpers';

export default function LoginMain() {
  const navigate = useNavigate();
  const setUserInfo = useContext(UserDispatchContext);
  const illegalCharacter = /[%&]/;
  const [passwordInvisible, setPasswordInvisible] = useState(true);
  const [emailRecorder, setEmailRecorder] = useState('');
  const [passwordRecorder, setPasswordRecorder] = useState('');
  const [loading, setLoading] = useState(false);

  const tip = (error: string) => {
    const tipLabel = document.getElementById('tip') as HTMLInputElement;
    tipLabel.textContent = error;
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const result = await login({
        email: emailRecorder,
        password: passwordRecorder
      });
      const { user, token, refreshToken } = result.data;
      if (user) {
        const userLoginInfo: IUserInfo = {
          id: user.id,
          email: user.email,
          name: user.name,
          avatarIcon: user?.avatarIcon,
          token,
          refreshToken
        };
        setUserInfo(userLoginInfo);
        localStorage.setItem('access_token', token);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem(
          'user_project_roles',
          JSON.stringify(projectRolesToObject(user.projectsRoles))
        );
        localStorage.setItem('is_admin', user.isAdmin);
        navigate(`/projects`);
      } else {
        setLoading(false);
        tip('*Incorrect email or password, please try again.');
      }
    } catch (error) {
      setLoading(false);
      tip('Something Go Wrong, Please contact staff!');
    }
  };

  const setEmail = (email: string) => {
    setEmailRecorder(email);
  };

  const setPassword = (password: string) => {
    if (!illegalCharacter.test(password)) {
      setPasswordRecorder(password);
      tip('');
    } else tip('Illegal Character Detected');
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.registerMain}>
      <img src={Icon} alt="TechScrum Icon" />
      <form onSubmit={handleSubmit}>
        <h1>Log in to your account</h1>
        <input
          className={styles.email}
          type="email"
          placeholder="Input Email Address"
          name="email"
          defaultValue={emailRecorder}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.inputContainer}>
          <input
            className={styles.password}
            id="password"
            type={passwordInvisible ? 'password' : 'text'}
            placeholder="Input Your Password"
            name="password"
            minLength={8}
            maxLength={16}
            defaultValue={passwordRecorder}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordInvisible ? (
            <MdOutlineVisibility
              onClick={() => {
                setPasswordInvisible(!passwordInvisible);
              }}
            />
          ) : (
            <MdVisibility
              onClick={() => {
                setPasswordInvisible(!passwordInvisible);
              }}
            />
          )}
        </div>
        <span id="tip" className={styles.tip} />
        <button type="submit" className={styles.btnMargin} onSubmit={handleSubmit}>
          Login
        </button>
        <div className={styles.formFooter}>
          <Link to="/register">Register</Link>
          <span>•</span>
          <Link to="/reset-password">Forgot password</Link>
        </div>
      </form>
      <p className={styles.registerMainFooter}>
        <Link to="/privacy-policy" target="_blank">
          Privacy Policy
        </Link>
        &nbsp;and &nbsp;
        <Link to="/terms-of-service" target="_blank">
          Terms of Service
        </Link>
      </p>
    </div>
  );
}
