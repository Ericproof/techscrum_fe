/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import InputV3 from './InputV3';
import styles from './ContactForm.module.scss';
import { reducer, ReducerActionTypes, initState } from './ContactFormReducer';

const FULLNAME_REGEX = /^[a-z ,.'-]+$/i;
const PHONE_REGEX = /^[0-9]{10}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export default function ContactForm() {
  const [title, setTitle] = useState('');
  const [reducerState, dispatch] = useReducer(reducer, initState);

  const handleTitleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTitle(e.target.value);
  };

  const handleFullNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerActionTypes.SetFullName,
      payload: e.target.value
    });
  };

  const handleCompanyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerActionTypes.SetCompany,
      payload: e.target.value
    });
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerActionTypes.SetPhone,
      payload: e.target.value
    });
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerActionTypes.SetEmail,
      payload: e.target.value
    });
  };

  const handleMsgInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: ReducerActionTypes.SetMsg,
      payload: e.target.value
    });
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const contactMessageObj = {
      title,
      fullName: reducerState.fullName,
      company: reducerState.company,
      phone: reducerState.phone,
      email: reducerState.email,
      message: reducerState.msg
    };
    console.log(contactMessageObj);
  };

  return (
    <div className={styles.container}>
      <form className={styles.contactForm} onSubmit={submitHandler}>
        <h3 className={styles.title}>Contact Us</h3>
        <div className={styles.inputField}>
          <label htmlFor="enquiryTitles">
            What&#39;s up *
            <select name="enquiryTitles" id="enquiryTitles" onChange={handleTitleSelect}>
              <option value="Just saying hi!" selected>
                Just saying hi!
              </option>
              <option value="I'd like to request a feature">
                I&#39;d like to request a feature
              </option>
              <option value="I have a question about billing">
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
          value={reducerState.fullName}
          onChange={handleFullNameInput}
          type="text"
          label="Full name *"
          identifier="fullName"
          regex={FULLNAME_REGEX}
          errMsg="Field required, lettes only, seperated with spaces."
        />
        <InputV3
          value={reducerState.company}
          onChange={handleCompanyInput}
          type="text"
          label="Company *"
          identifier="company"
          errMsg="Field required, ensure the validity of your company."
        />
        <InputV3
          value={reducerState.phone}
          onChange={handlePhoneInput}
          type="tel"
          label="Phone Number *"
          identifier="phoneNumber"
          regex={PHONE_REGEX}
          errMsg="Field required, 10 Digit Phone Number."
        />
        <InputV3
          value={reducerState.email}
          onChange={handleEmailInput}
          type="email"
          label="Email address *"
          identifier="email"
          regex={EMAIL_REGEX}
          errMsg="Field required, must be a valid email."
        />
        <InputV3
          value={reducerState.msg}
          onChange={handleMsgInput}
          type="text"
          label="Any more info you can provide *"
          identifier="contactMsg"
          tagType="textarea"
          errMsg="Field required, thanks for your message."
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
