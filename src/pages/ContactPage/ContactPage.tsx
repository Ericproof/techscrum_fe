import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BsCalendar4Week } from 'react-icons/bs';
import { BiMessageSquareDetail } from 'react-icons/bi';
import Headers from '../../components/Header/Header';
import styles from './ContactPage.module.scss';
import ContactForm from './ContactForm/ContactForm';

export default function ContactPage() {
  return (
    <>
      <Headers />
      <div className={styles.contactPage}>
        <span className={styles.shape2Container}>
          <img
            src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape-2.png"
            alt=""
          />
        </span>
        <div className={styles.circleContainer}>
          <img
            src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape.png"
            alt=""
          />
        </div>
        <span className={styles.shape3Container}>
          <img
            src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape-3.png"
            alt=""
          />
        </span>
        <div className={styles.container}>
          <div className={styles.content}>
            <p className={styles.title}>GET A DEMO</p>
            <h1>Contact Information</h1>
            <p>Fill up the form and our team will get back to you as soon as possible.</p>
            <ul>
              <li>
                <div className={styles.icons}>
                  <AiOutlineEye />
                </div>
                <p className={styles.info}>Work in progress (WIP)</p>
              </li>
              <li>
                <div className={styles.icons}>
                  <BsCalendar4Week />
                </div>
                <p className={styles.info}>info@techscrumapp.com</p>
              </li>
              <li>
                <div className={styles.icons}>
                  <BiMessageSquareDetail />
                </div>
                <p className={styles.info}>Australia, Melbourne</p>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
