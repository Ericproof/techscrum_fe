import React from 'react';
import styles from './privacyPolicy.module.scss';

export default function PrivacyPolicy() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h3 className={styles.header1}>LEGAL</h3>
        <h1 className={styles.header2}>Privacy policy</h1>
        <hr className={styles.hr} />
        <div className={styles.smallScreen}> </div>
        <section className={styles.section}>
          <h4>Business Privacy Policy</h4>
          <p>
            This privacy policy sets out how TechScrum.com and any related products, services, apps
            or integrations uses and protects any information that you provide when you use our
            products TechScrum, Desk, Spaces, CRM, any of our mobile or desktop app offerings and
            our integrations with third party apps and services.
          </p>
          <p>
            TechScrum.com is committed to ensuring that your privacy is protected. Should we ask you
            to provide certain information by which you can be identified when using our products,
            then you can be assured that it will only be used in accordance with this privacy
            statement. This policy is effective from 25th May 2018.
          </p>
          <h4>What we collect</h4>
          <p>
            We may collect certain information that we need in order to provide you with the
            business service and products that you receive from us. The information may include the
            following:
          </p>
          <ul>
            <li>Name and job title.</li>
            <li>Business address</li>
            <li>Business telephone number</li>
            <li>Email address</li>
            <li>IP-address</li>
            <li>Location data</li>
          </ul>
          <h4>What we do with the information we gather</h4>
          <p>
            We require this information to understand your needs and provide you with a better
            service, and in particular for the following reasons:
          </p>
          <ul>
            <li>Internal record keeping.</li>
            <li>We may use the information to improve our products and services.</li>
            <li>
              We will communicate with individuals using our products based on their usage type and
              their communication preferences, as described here:
              <ul>
                <li className={styles.br}>
                  Free Trial Users: We will support your free trial experience by sending you
                  product and service-related announcements via email regarding technical or
                  administrative issues considered valuable or essential to your continued ability
                  to use the product/service e.g. free trial ending notifications. However, if you
                  do not wish to receive these please unsubscribe by emailing
                  unsubscribeTechScrum.com
                </li>
                <li>
                  Paid Users (including customers on a Free plan): From time to time, we may send
                  you technical notices, updates, security alerts, and support and administrative
                  messages and subscription alerts. These emails are not promotional in nature. If
                  you have opted-in to receive email communications, we reserve the right to send
                  email communications (regarding promotional offers, events, invites) from time to
                  time in accordance with your communications preferences. Users who receive these
                  marketing materials can opt out at any time. If you do not want to receive
                  marketing materials from us, you can opt-out by clearly following the
                  “unsubscribe” instructions at the bottom of any email you receive or by emailing
                  us at unsubscribeTechScrum.com.
                </li>
              </ul>
            </li>
            <li>
              From time to time, we may also use your information to contact you for market research
              purposes. We may contact you by email, phone, fax or mail.
            </li>
          </ul>
          <p>
            Additional Limits on Use of Your Google User Data: Notwithstanding anything elsein this
            Privacy Policy, if you provide the App access to the following types of your Google
            data, the App’s use of that data will be subject to these additional restrictions:
          </p>
          <ul>
            <li>
              The App will only use access to read, write, modify or control Gmail message bodies
              (including attachments), metadata, headers, and settings to provide a web email client
              that allows users to compose, send, read,and process emails and will not transfer this
              Gmail data to others unless doing so is necessary to provide and improve these
              features, comply with applicable law, or as part of a merger, acquisition, or sale of
              assets.
            </li>
            <li>The App will not use this Gmail data for serving advertisements.</li>
            <li>
              The App will not allow humans to read this data unless we have your affirmative
              agreement for specific messages, doing so is necessary for security purposes such as
              investigating abuse, to comply with applicable law, or for the App’s internal
              operations and even then only when the data have been aggregated and anonymized.
            </li>
            <li>
              The App use and transfer to any other app of information received from Google APIs
              will adhere to{' '}
              <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes">
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </li>
          </ul>
          <h4>Security</h4>
          <p>
            We are committed to ensuring that your information is secure. In order to prevent
            unauthorised access or disclosure, we have put in place suitable physical, electronic
            and managerial procedures to safeguard and secure the information we collect online.
          </p>
          <h4>How we use cookies</h4>
          <p>
            Cookies allow web applications to respond to you as an individual. The web application
            can tailor its operations to your needs, likes and dislikes by gathering and remembering
            information about your preferences.
          </p>
          <p>
            For more information on our use of cookies, please read our{' '}
            <a href="https://www.TechScrum.com/legal/cookie-policy/">Cookie Policy</a> .
          </p>
          <h4>Links to other websites</h4>
          <p>
            Our website may contain links to other websites of interest. However, once you have used
            these links to leave our site, you should note that we do not have any control over that
            other website. Therefore, we cannot be responsible for the protection and privacy of any
            information which you provide whilst visiting such sites and such sites are not governed
            by this privacy statement. You should exercise caution and look at the privacy statement
            applicable to the website in question.
          </p>
          <h4>Controlling your personal information</h4>
          <p>
            You may choose to restrict the collection or use of your personal information in the
            following ways:
          </p>
          <ul>
            <li>
              Whenever you are asked to fill in a form on the website, look for the box that you can
              click to indicate that you do not want the information to be used by anybody for
              direct marketing purposes.
            </li>
            <li>
              If you have previously agreed to us using your personal information for direct
              marketing purposes, you may change your mind at any time by writing to or emailing us
              at privacyTechScrum.com.
            </li>
          </ul>
          <p>
            We will not sell, distribute or lease your personal information to third parties unless
            we have your permission or are required by law to do so. We may use your personal
            information to send you promotional information about third parties which we think you
            may find interesting if you tell us that you wish this to happen.
          </p>
          <p>
            You may request details of personal information which we hold about you. If you believe
            that any information we are holding on you is incorrect or incomplete, please write to
            or email us as soon as possible, at privacyTechScrum.com. We will promptly correct any
            information found to be incorrect.
          </p>
        </section>
      </div>
    </div>
  );
}
