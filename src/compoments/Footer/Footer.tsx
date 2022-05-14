import React from 'react';
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiFillInstagram
} from 'react-icons/ai';
import styles from './Footer.module.scss';
import IOS from '../../Asset/download-app-iOS.svg';
import Android from '../../Asset/download-app-google.svg';

export default function Footer() {
  return (
    <footer>
      <div className={styles.Teamwork_Label}>
        <div className={styles.label_background} />
        <div className={styles.content}>
          <h1>Get Started with Teamwork</h1>
          <p>
            <span>
              Start working together beautifully. See how Teamwork can help your team with our
              30-day free trial.
            </span>
          </p>
        </div>
        <div className={styles.button_list}>
          <a className={styles.white} href="/#">
            Try Teamwork for Free
          </a>
          <a className={styles.black} href="/#">
            Join a webinar
          </a>
          <a className={styles.black} href="/#">
            Get in touch
          </a>
        </div>
      </div>
      <div className={styles.services__list}>
        <div className={styles.service}>
          <h1 className={styles.title}>
            company
            <span>+</span>
          </h1>
          <ul>
            <li>
              <a href="/#">About Teamwork</a>
            </li>
            <li>
              <a href="/#">LeaderShip</a>
            </li>
            <li>
              <a href="/#">Careers</a>
            </li>
            <li>
              <a href="/#">Security</a>
            </li>
            <li>
              <a href="/#">News</a>
            </li>
            <li>
              <a href="/#">Brand</a>
            </li>
            <li>
              <a href="/#">Affiliate program</a>
            </li>
            <li>
              <a href="/#">Partner program</a>
            </li>
            <li>
              <a href="/#">Contact us</a>
            </li>
            <li>
              <a href="/#">Support Center</a>
            </li>
            <li>
              <a href="/#">Startups</a>
            </li>
          </ul>
        </div>
        <div className={styles.service}>
          <h1 className={styles.title}>
            products
            <span>+</span>
          </h1>
          <ul>
            <li>
              <a href="/#">Teamwork Desk</a>
            </li>
            <li>
              <a href="/#">Teamwork Chat</a>
            </li>
            <li>
              <a href="/#">Teamwork Spaces</a>
            </li>
            <li>
              <a href="/#">Teamwork CRM</a>
            </li>
            <li>
              <a href="/#">View all products</a>
            </li>
            <li>
              <a href="/#">Integrations</a>
            </li>
            <li>
              <a href="/#">Roadmap</a>
            </li>
            <li>
              <a href="/#">Status</a>
            </li>
            <li>
              <a href="/#">API</a>
            </li>
          </ul>
        </div>
        <div className={styles.service}>
          <h1 className={styles.title}>
            solutions<span>+</span>
          </h1>
          <ul>
            <li>
              <a href="/#">Remote work</a>
            </li>
            <li>
              <a href="/#">Marketing agency</a>
            </li>
            <li>
              <a href="/#">Marketing teams</a>
            </li>
            <li>
              <a href="/#">Product teams</a>
            </li>
            <li>
              <a href="/#">Professional services</a>
            </li>
            <li>
              <a href="/#">Product development</a>
            </li>
            <li>
              <a href="/#">Work management</a>
            </li>
          </ul>
        </div>
        <div className={styles.service}>
          <h1 className={styles.title}>
            Resources<span>+</span>
          </h1>
          <ul>
            <li>
              <a href="/#">Blog</a>
            </li>
            <li>
              <a href="/#">Project management guild</a>
            </li>
            <li>
              <a href="/#">Project timeline guild</a>
            </li>
            <li>
              <a href="/#">Project schedule guild</a>
            </li>
            <li>
              <a href="/#">Product launch template</a>
            </li>
            <li>
              <a href="/#">Software launch plan</a>
            </li>
            <li>
              <a href="/#">Event marketing template</a>
            </li>
            <li>
              <a href="/#">Creative request form</a>
            </li>
          </ul>
        </div>
        <div className={styles.service}>
          <h1 className={styles.title}>
            Compare<span>+</span>
          </h1>
          <ul>
            <li>
              <a href="/#">Teamwork vs Asana</a>
            </li>
            <li>
              <a href="/#">Teamwork vs Monday</a>
            </li>
            <li>
              <a href="/#">Teamwork vs Wrike</a>
            </li>
            <li>
              <a href="/#">Teamwork vs Trello</a>
            </li>
            <li>
              <a href="/#">Teamwork vs Smartsheet</a>
            </li>
            <li>
              <a href="/#">Teamwork vs MS Planner</a>
            </li>
            <li>
              <a href="/#">Teamwork vs Basecamp</a>
            </li>
            <li>
              <a href="/#">Teamwork vs ClickUp</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.policies_Media_DownloadPlatform}>
        <div className={styles.left}>
          <a href="/#">Terms & Privacy</a>
        </div>
        <div className={styles.middle}>
          <a href="/#">
            <AiFillFacebook />
          </a>
          <a href="/#">
            <AiFillLinkedin />
          </a>
          <a href="/#">
            <AiFillTwitterSquare />
          </a>
          <a href="/#">
            <AiFillYoutube />
          </a>
          <a href="/#">
            <AiFillInstagram />
          </a>
        </div>
        <div className={styles.right}>
          <a href="/#">
            <img src={IOS} alt="Download iOS App" draggable="false" loading="lazy" />
          </a>
          <a href="/#">
            <img src={Android} alt="Download Android App" draggable="false" loading="lazy" />
          </a>
        </div>
      </div>
    </footer>
  );
}
