import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ContactForm.module.scss';

export default function ContactForm() {
  return (
    <div className={styles.container}>
      <form>
        <h3>Contact Us</h3>
        <div>
          <input id="email" name="Full Name" className="textfield__input" type="text" />
        </div>
        <input placeholder="Company *" />
        <input placeholder="Work Email Address *" />
        <input placeholder="Phone Number *" />
        <button type="submit">Send</button>
        <p>
          TechScrum values your privacy. By submitting this form, you acknowledge TechScrum may use
          your email in accordance with its{' '}
          <Link to="/privacy-policy" className={styles.link}>
            Privacy Policy.{' '}
          </Link>
          Unsubscribe from our emails at any time.
        </p>
      </form>
    </div>
  );
}
