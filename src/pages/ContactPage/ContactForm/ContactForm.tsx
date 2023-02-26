/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { ImCross } from 'react-icons/im';
import { TiTick, TiTimes } from 'react-icons/ti';
import Modal from '../../../lib/Modal/Modal';
import DefaultModalBody from '../../../lib/Modal/ModalBody/DefaultModalHeader/DefaultModalBody';
import InputV3 from './InputV3';
import styles from './ContactForm.module.scss';
import { reducer, ReducerActionTypes, initState } from './ContactFormReducer';

const FULLNAME_REGEX = /^[a-z ,.'-]+$/i;
const PHONE_REGEX = /^[0-9]{10}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const enquiryTitles = [
  `Just saying hi!`,
  `I'd like to request a feature`,
  `I have a question about billing`,
  `I'm confused about how something works`,
  `Other`
];

export default function ContactForm() {
  const [title, setTitle] = useState(enquiryTitles[0]);
  const [isFormValid, setIsFormValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [reqStatus, setReqStatus] = useState(201);
  const [modal, setModal] = useState(true);
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

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // here check if obj valid
    const isAllFilled = Object.values(reducerState).every((item) => item.length > 0);
    const isAllRegexPassed = [
      FULLNAME_REGEX.test(reducerState.fullName),
      PHONE_REGEX.test(reducerState.phone),
      EMAIL_REGEX.test(reducerState.email)
    ].every((each) => each);
    if (!isAllFilled || !isAllRegexPassed) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
    const contactMessageObj = { ...reducerState, title };
    console.log(contactMessageObj);
    dispatch({ type: ReducerActionTypes.FormReset });
    setLoading(true);
    // post request starting here
    try {
      const response = await fetch('http://localhost:8000/api/v1/emailus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactMessageObj)
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setLoading(false);
      setModal(true);
      // get request status and set it here
    }, 2000);
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.contactForm} onSubmit={submitHandler}>
          <h3 className={styles.title}>Contact Us</h3>
          {!isFormValid && <p className={styles.errMsg}>Please valid your form.</p>}
          {loading && <p className={styles.loading}>Receiving...</p>}
          <div className={styles.inputField}>
            <label htmlFor="enquiryTitles">
              What&#39;s up *
              <select name="enquiryTitles" id="enquiryTitles" onChange={handleTitleSelect}>
                {enquiryTitles.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
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
            value={reducerState.message}
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
            TechScrum values your privacy. By submitting this form, you acknowledge TechScrum may
            use your email in accordance with its{' '}
            <Link to="/privacy-policy" className={styles.link}>
              Privacy Policy.{' '}
            </Link>
            Unsubscribe from our emails at any time.
          </p>
        </form>
      </div>

      {modal &&
        ReactDOM.createPortal(
          <Modal fullWidth data-testid="modal">
            <div className={styles.close}>
              <ImCross onClick={() => setModal(false)} />
            </div>
            <DefaultModalBody defaultPadding={false} classesName={styles.modalPadding}>
              <div className={styles.iconPosition}>
                {reqStatus === 200 ? (
                  <TiTick size={200} color="yellowgreen" />
                ) : (
                  <TiTimes size={200} color="orangered" />
                )}
              </div>
              <div className={styles.messagePosition}>
                {reqStatus === 200 ? (
                  <h2>Thanks for contacting us from this page, we will reply via email asap.</h2>
                ) : (
                  <h2>Some error happened, we will try to fix it soon</h2>
                )}
              </div>
            </DefaultModalBody>
          </Modal>,
          document.body
        )}
    </>
  );
}
