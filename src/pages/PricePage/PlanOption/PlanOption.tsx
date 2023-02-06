import React from 'react';
import styles from './PlanOption.module.scss';

const plans = {
  content: {
    title: 'Plans',
    content: [
      {
        plan: 'Free',
        popularity: '',
        description: 'Perfect for individuals or new businesses.',
        original_price: '',
        current_price: '$0/mo',
        discount_information: '',
        action: 'Sign Up',
        buy_action: '',
        includes: [
          '100 entries',
          '1 user license',
          '1 custom field',
          'Help center and email support'
        ],
        note: ''
      },
      {
        plan: 'Advanced',
        popularity: '',
        description: 'Affordable tools small businesses need to manage their inventory and assets.',
        original_price: '$49',
        current_price: '$29/mo',
        discount_information: '$348 billed yearly save $240',
        action: 'Start Trial',
        buy_action: 'Buy Now',
        includes: [
          '2,000 entries',
          '2 user licenses',
          '10 custom fields',
          'Help center and email support',
          'Unlimited QR code label generation',
          'In-app barcode scanner'
        ],
        note: 'Offer available to new customers only. Discounted pricing applies only to first year of subscription.'
      },
      {
        plan: 'Ultra',
        popularity: 'Most Popular',
        description: 'Scalable inventory solution for growing businesses.',
        original_price: '$149',
        current_price: '$59/mo',
        discount_information: '$720 billed yearly save $1,080',
        action: 'Start Trial',
        buy_action: 'Buy Now',
        includes: [
          '10,000 entries',
          '5 user license',
          '25 custom field',
          'Priority email support',
          'Unlimited QR code & barcode label generation,',
          'In-app barcode scanner',
          'Use external/handheld scanners'
        ],
        note: ''
      },
      {
        plan: 'Enterprise',
        popularity: '',
        description: 'For organizations that need additional security, control, and support.',
        original_price: '',
        current_price: 'Get a Quote',
        discount_information: '',
        action: 'Contact Us',
        buy_action: '',
        includes: [
          'Unlimited entries',
          '10+ user licenses',
          'Unlimited custom fields',
          'Scheduled phone support and custom training',
          'Unlimited QR code & barcode label generation',
          'In-app barcode scanner',
          'Use external/handheld scanners',
          'API Access',
          'SSO'
        ],
        note: ''
      }
    ]
  }
};

function PlanOption() {
  const { content } = plans;
  return (
    <div className={styles.group}>
      {content.content.map((plan, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.plan}>
            <h2>{plan.plan}</h2>
            {plan.popularity && <h3>{plan.popularity}</h3>}
          </div>

          <div className={styles.description}>{plan.description}</div>

          <div className={styles.discount}>
            <div className={styles.price}>
              {plan.original_price && <h3>{plan.original_price}</h3>}
              <h1>{plan.current_price}</h1>
            </div>
            {plan.discount_information && (
              <div className={styles.discount_information}>{plan.discount_information}</div>
            )}
          </div>

          <div className={styles.buttons}>
            <button className={styles.action}>{plan.action}</button>
            {plan.buy_action && <button className={styles.buy_action}>{plan.buy_action}</button>}
          </div>

          <div className={styles.service}>
            <h3>Includes:</h3>
            <ul>
              {plan.includes.map((include, idx) => (
                <li key={idx} className={styles.term}>
                  {include}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlanOption;
