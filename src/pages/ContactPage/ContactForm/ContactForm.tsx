/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import InputV3 from './InputV3';
import styles from './ContactForm.module.scss';
import { reducer, ReducerActionTypes, initState } from './ContactFormReducer';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export default function ContactForm() {
  const [reducerState, dispatch] = useReducer(reducer, initState);

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerActionTypes.SetEmail,
      payload: e.target.value
    });
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const contactMessageObj = { email: reducerState.email };
    console.log(contactMessageObj);
  };

  return (
    <div className={styles.container}>
      <form className={styles.contactForm} onSubmit={submitHandler}>
        <h3 className={styles.title}>Contact Us</h3>
        <div className={styles.inputField}>
          <label htmlFor="enquiryTypes">
            What&#39;s up *
            <select name="enquiryTypes" id="enquiryTypes">
              <option value="Just saying hi!">Just saying hi!</option>
              <option value="I'd like to request a feature">
                I&#39;d like to request a feature
              </option>
              <option value="I have a question about billing" selected>
                I have a question about billing
              </option>
              <option value="I'm confused about how something works">
                I&#39;m confused about how something works
              </option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        <InputV3
          value={reducerState.email}
          onChange={handleEmailInput}
          type="email"
          label="Email address *"
          identifier="email"
          regex={EMAIL_REGEX}
          errMsg="Field required, must be a valid email"
        />

        <button className={styles.contactForm} type="submit">
          Send
        </button>
        <p className={styles.desc}>
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
