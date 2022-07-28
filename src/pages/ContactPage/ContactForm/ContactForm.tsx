import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ContactForm.module.scss';

export default function ContactForm() {
  const handleSubmit = () => {};
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h3>Get a Live Demo</h3>
        <input placeholder="Full Name *" />
        <input placeholder="Company *" />
        <input placeholder="Work Email Address *" />
        <input placeholder="Phone Number *" />
        <button type="submit">Book a Demo</button>
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
