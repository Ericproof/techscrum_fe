import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import styles from './PrivacyPolicy.module.scss';

export default function PrivacyPolicy() {
  return (
    <div className={styles.privacyPolicyMain}>
      <div className={styles.privacyPolicyContent}>
        <h3 className={styles.privacyPolicyHeader1}>LEGAL</h3>
        <h1 className={styles.privacyPolicyHeader2}>Privacy policy</h1>
        <hr className={styles.privacyPolicyHr} />
        <div className={styles.privacyPolicySmallScreen}>
          <div className={styles.sidebar}>
            <ul className={styles.stickySidebar}>
              <li id={styles.RemoveBorder}>
                <Link to="/" style={{ padding: '0 0 7px 0' }}>
                  Our Legal Documents
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/gdpr">GDPR compliance</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/privacy-statement">Privacy Statement</Link>
              </li>
              <li>
                <Link to="/refund-policy">Refund Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service">Terms Of Service</Link>
              </li>
            </ul>
            <Outlet />
          </div>
          <section className={styles.privacyPolicySection}>
            <h4 className={styles.privacyPolicyH4}>Business Privacy Policy</h4>
            <p className={styles.privacyPolicyP}>
              This privacy policy sets out how TechScrum.com and any related products, services,
              apps or integrations uses and protects any information that you provide when you use
              our products TechScrum, Desk, Spaces, CRM, any of our mobile or desktop app offerings
              and our integrations with third party apps and services.
            </p>
            <p className={styles.privacyPolicyP}>
              TechScrum.com is committed to ensuring that your privacy is protected. Should we ask
              you to provide certain information by which you can be identified when using our
              products, then you can be assured that it will only be used in accordance with this
              privacy statement. This policy is effective from 25th May 2018.
            </p>
            <h4 className={styles.privacyPolicyH4}>What we collect</h4>
            <p className={styles.privacyPolicyP}>
              We may collect certain information that we need in order to provide you with the
              business service and products that you receive from us. The information may include
              the following:
            </p>
            <ul className={styles.privacyPolicyUl}>
              <li className={styles.privacyPolicyLi}>Name and job title.</li>
              <li className={styles.privacyPolicyLi}>Business address</li>
              <li className={styles.privacyPolicyLi}>Business telephone number</li>
              <li className={styles.privacyPolicyLi}>Email address</li>
              <li className={styles.privacyPolicyLi}>IP-address</li>
              <li className={styles.privacyPolicyLi}>Location data</li>
            </ul>
            <h4 className={styles.privacyPolicyH4}>What we do with the information we gather</h4>
            <p className={styles.privacyPolicyP}>
              We require this information to understand your needs and provide you with a better
              service, and in particular for the following reasons:
            </p>
            <ul className={styles.privacyPolicyUl}>
              <li className={styles.privacyPolicyLi}>Internal record keeping.</li>
              <li className={styles.privacyPolicyLi}>
                We may use the information to improve our products and services.
              </li>
              <li className={styles.privacyPolicyLi}>
                We will communicate with individuals using our products based on their usage type
                and their communication preferences, as described here:
                <ul className={styles.privacyPolicyUl}>
                  <li className={`${styles.privacyPolicyBr} ${styles.privacyPolicyLi}`}>
                    Free Trial Users: We will support your free trial experience by sending you
                    product and service-related announcements via email regarding technical or
                    administrative issues considered valuable or essential to your continued ability
                    to use the product/service e.g. free trial ending notifications. However, if you
                    do not wish to receive these please unsubscribe by emailing
                    unsubscribeTechScrum.com
                  </li>
                  <li className={styles.privacyPolicyLi}>
                    Paid Users (including customers on a Free plan): From time to time, we may send
                    you technical notices, updates, security alerts, and support and administrative
                    messages and subscription alerts. These emails are not promotional in nature. If
                    you have opted-in to receive email communications, we reserve the right to send
                    email communications (regarding promotional offers, events, invites) from time
                    to time in accordance with your communications preferences. Users who receive
                    these marketing materials can opt out at any time. If you do not want to receive
                    marketing materials from us, you can opt-out by clearly following the
                    “unsubscribe” instructions at the bottom of any email you receive or by emailing
                    us at unsubscribeTechScrum.com.
                  </li>
                </ul>
              </li>
              <li className={styles.privacyPolicyLi}>
                From time to time, we may also use your information to contact you for market
                research purposes. We may contact you by email, phone, fax or mail.
              </li>
            </ul>
            <p>
              Additional Limits on Use of Your Google User Data: Notwithstanding anything elsein
              this Privacy Policy, if you provide the App access to the following types of your
              Google data, the App’s use of that data will be subject to these additional
              restrictions:
            </p>
            <ul className={styles.privacyPolicyUl}>
              <li className={styles.privacyPolicyLi}>
                The App will only use access to read, write, modify or control Gmail message bodies
                (including attachments), metadata, headers, and settings to provide a web email
                client that allows users to compose, send, read,and process emails and will not
                transfer this Gmail data to others unless doing so is necessary to provide and
                improve these features, comply with applicable law, or as part of a merger,
                acquisition, or sale of assets.
              </li>
              <li className={styles.privacyPolicyLi}>
                The App will not use this Gmail data for serving advertisements.
              </li>
              <li className={styles.privacyPolicyLi}>
                The App will not allow humans to read this data unless we have your affirmative
                agreement for specific messages, doing so is necessary for security purposes such as
                investigating abuse, to comply with applicable law, or for the App’s internal
                operations and even then only when the data have been aggregated and anonymized.
              </li>
              <li className={styles.privacyPolicyLi}>
                The App use and transfer to any other app of information received from Google APIs
                will adhere to
                <a
                  className={styles.privacyPolicyA}
                  href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements.
              </li>
            </ul>
            <h4 className={styles.privacyPolicyH4}>Security</h4>
            <p className={styles.privacyPolicyP}>
              We are committed to ensuring that your information is secure. In order to prevent
              unauthorised access or disclosure, we have put in place suitable physical, electronic
              and managerial procedures to safeguard and secure the information we collect online.
            </p>
            <h4 className={styles.privacyPolicyH4}>How we use cookies</h4>
            <p className={styles.privacyPolicyP}>
              Cookies allow web applications to respond to you as an individual. The web application
              can tailor its operations to your needs, likes and dislikes by gathering and
              remembering information about your preferences.
            </p>
            <p className={styles.privacyPolicyP}>
              For more information on our use of cookies, please read our{' '}
              <a
                className={styles.privacyPolicyA}
                href="https://www.TechScrum.com/legal/cookie-policy/"
              >
                Cookie Policy
              </a>
              .
            </p>
            <h4 className={styles.privacyPolicyH4}>Links to other websites</h4>
            <p className={styles.privacyPolicyP}>
              Our website may contain links to other websites of interest. However, once you have
              used these links to leave our site, you should note that we do not have any control
              over that other website. Therefore, we cannot be responsible for the protection and
              privacy of any information which you provide whilst visiting such sites and such sites
              are not governed by this privacy statement. You should exercise caution and look at
              the privacy statement applicable to the website in question.
            </p>
            <h4 className={styles.privacyPolicyH4}>Controlling your personal information</h4>
            <p className={styles.privacyPolicyP}>
              You may choose to restrict the collection or use of your personal information in the
              following ways:
            </p>
            <ul className={styles.privacyPolicyUl}>
              <li className={styles.privacyPolicyLi}>
                Whenever you are asked to fill in a form on the website, look for the box that you
                can click to indicate that you do not want the information to be used by anybody for
                direct marketing purposes.
              </li>
              <li className={styles.privacyPolicyLi}>
                If you have previously agreed to us using your personal information for direct
                marketing purposes, you may change your mind at any time by writing to or emailing
                us at privacyTechScrum.com.
              </li>
            </ul>
            <p className={styles.privacyPolicyP}>
              We will not sell, distribute or lease your personal information to third parties
              unless we have your permission or are required by law to do so. We may use your
              personal information to send you promotional information about third parties which we
              think you may find interesting if you tell us that you wish this to happen.
            </p>
            <p className={styles.privacyPolicyP}>
              You may request details of personal information which we hold about you. If you
              believe that any information we are holding on you is incorrect or incomplete, please
              write to or email us as soon as possible, at privacyTechScrum.com. We will promptly
              correct any information found to be incorrect.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
