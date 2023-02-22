import React from 'react';
import styles from './Contact.module.scss';

export default function Contact() {
  return (
    <div className={styles.contact}>
      <div className={styles.contactContainer}>
        <div className={styles.workTime}>
          <p>TechScrum’s Support team is available Monday through Friday,</p>
          <p>9.00am - 5.00pm IST, limited weekend cover.</p>
        </div>
        <div className={styles.contactDetail}>
          <div className={styles.formContainer}>
            <div className={styles.contactDetailForm}>
              <form>
                <div>
                  <label htmlFor={`'problem'`}>
                    <p>What’s up *</p>
                    <select name="problem" id="problem">
                      <option value="greeting">Just saying hi!</option>
                      <option value="feature">I’d like to request a feature</option>
                      <option value="billing">I have a question about billing</option>
                      <option value="how to work">I‘m confused about how something works</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label htmlFor={`'fullName'`}>
                    <p>Full name *</p>
                    <input type="text" id="fullName" required autoComplete="off" />
                  </label>
                </div>
                <div>
                  <label htmlFor={`'email'`}>
                    <p>Email address *</p>
                    <input type="text" id="email" required autoComplete="off" />
                  </label>
                </div>
                <div>
                  <label htmlFor={`'moreInfo'`}>
                    <p>Any more info you can provide *</p>
                    <input type="text" id="moreInfo" required autoComplete="off" />
                  </label>
                </div>
                <div>
                  <label htmlFor={`'url'`}>
                    <p>Your TechScrum URL *</p>
                    <input type="text" id="url" required autoComplete="off" />
                  </label>
                </div>
                <p className={styles.privacy}>
                  By submitting, you confirm that you agree to the storing and processing of your
                  personal data by Teamwork as described in our
                  <a href="http://localhost:3001/privacy-policy">Privacy Statement</a>
                </p>
                <input className={styles.submit} type="submit" value="Submit your ticket" />
              </form>
            </div>
          </div>
          <div className={styles.emailContainer}>
            <h4>Email us</h4>
            <p>
              Send us an email at
              <a href="info@techscrumapp.com">info@techscrumapp.com</a>
            </p>
            <h4>Join a webinar</h4>
            <p>Join our live webinars to see our products in action.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
