import React from 'react';
import styles from './Partners.module.scss';

export default function Partners() {
  return (
    <div className={styles.PartnersContainer}>
      <h3>Trusted by over 20,000 companies</h3>
      <p>Join teams all over the world increasing their productivity with Teamwork</p>
      <div className={styles.CustomerLogs}>
        <div className={styles.SingleLogContainer}>
          <img
            src="https://website-assets.teamwork.com/offload/app/uploads/2019/08/07113349/paypal.svg"
            alt="Paypal"
          />
        </div>
        <div className={styles.SingleLogContainer}>
          <img
            src="https://website-assets.teamwork.com/offload/app/uploads/2020/01/31024322/daddario.svg"
            alt="Paypal"
          />
        </div>
        <div className={styles.SingleLogContainer}>
          <img
            src="https://website-assets.teamwork.com/offload/app/uploads/2019/08/07151629/disney.svg"
            alt="Paypal"
          />
        </div>
        <div className={styles.SingleLogContainer}>
          <img
            src="https://website-assets.teamwork.com/offload/app/uploads/2019/08/07165123/spotify.svg"
            alt="Paypal"
          />
        </div>
        <div className={styles.SingleLogContainer}>
          <img
            src="https://website-assets.teamwork.com/offload/app/uploads/2020/01/31024853/special-olympics%402x.png"
            alt="Paypal"
          />
        </div>

        <div className={styles.SingleLogContainer}>
          <img
            src="https://website-assets.teamwork.com/offload/app/uploads/2020/01/31025007/netflix.svg"
            alt="Paypal"
          />
        </div>
        <div className={styles.SingleLogContainer}>
          <img
            src="https://website-assets.teamwork.com/offload/app/uploads/2020/01/31025157/ellas-kitchen.svg"
            alt="Paypal"
          />
        </div>
        <div className={styles.SingleLogContainer}>
          <img
            src="https://website-assets.teamwork.com/offload/app/uploads/2020/01/31025753/idea-planet%402x.png"
            alt="Paypal"
          />
        </div>
        <div className={styles.SingleLogContainer}>
          <img
            src="https://website-assets.teamwork.com/offload/app/uploads/2019/08/07172805/hp.svg"
            alt="Paypal"
          />
        </div>
        <div className={styles.SingleLogContainer}>
          <img
            src="https://website-assets.teamwork.com/offload/app/uploads/2020/01/31025840/panasonic.svg"
            alt="Paypal"
          />
        </div>
      </div>
    </div>
  );
}
