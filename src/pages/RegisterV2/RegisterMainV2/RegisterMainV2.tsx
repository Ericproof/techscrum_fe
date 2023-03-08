import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RegisterMainV2.module.scss';
import Icon from '../../../assets/logo.svg';

export default function RegisterMainV2() {
  return (
    <div className={styles.registerMainContainer}>
      <img className={styles.techScrumIcon} src={Icon} alt="TechScrum Icon" />
      <form className={styles.registerForm}>
        <h1 className={styles.registerTitle}>Register To Continue</h1>
        <input placeholder="Enter your email address" type="email" name="email" />
        <p className={styles.registerPolicy}>
          By registering, I accept the&nbsp;
          <Link to="/terms-of-service" target="_blank" className={styles.registerPolicyLink}>
            TechScrum Terms of Service&nbsp;
          </Link>
          and confirm acceptance of the&nbsp;
          <Link to="/privacy-policy" target="_blank" className={styles.registerPolicyLink}>
            Privacy Policy.
          </Link>
        </p>
        <button type="submit" className={styles.registerSubmitBtn}>
          Register
        </button>
        <div className={styles.thirdPartyRegisterContainer}>
          <h1 className={styles.thirdPartyRegisterTitle}>Or Register Via:</h1>
          <button className={styles.thirdPartyBtn}>
            <img
              className={styles.thirdPartyImg}
              src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.424/static/media/google-logo.e086107b.svg"
              alt="google"
            />
            <div className={styles.thirdPartyDesc}>Use Google to Continue</div>
          </button>
          <button className={styles.thirdPartyBtn}>
            <img
              className={styles.thirdPartyImg}
              src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.424/static/media/microsoft-logo.42b61fa1.svg"
              alt="microsoft"
            />
            <div className={styles.thirdPartyDesc}>Use Microsoft to Continue</div>
          </button>
        </div>
        <div className={styles.registerLoginContainer}>
          <Link to="/login" className={styles.registerLogin}>
            Already have TechScrum Account? Login
          </Link>
        </div>
        <div className={styles.registerFooter}>
          <img className={styles.techScrumFooterIcon} src={Icon} alt="TechScrum Icon" />
          <p className={styles.registerFooterText}>
            <Link to="/privacy-policy" target="_blank" className={styles.registerFooterTextLink}>
              Privacy Policy
            </Link>
            &nbsp;and&nbsp;
            <Link to="/terms-of-service" target="_blank" className={styles.registerFooterTextLink}>
              Terms of Service
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
