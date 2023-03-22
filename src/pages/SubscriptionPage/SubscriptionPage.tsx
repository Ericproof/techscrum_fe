import React, { useEffect, useState, useContext } from 'react';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsBriefcase, BsCreditCard } from 'react-icons/bs';
import axios from 'axios';
import styles from './SubscriptionPage.module.scss';
import SubSettingMenu from '../../lib/SubSettingMenu/SubSettingMenu';
import MainMenuV2 from '../MainMenuV2/MainMenuV2';
import config from '../../config/config';
import { UserContext } from '../../context/UserInfoProvider';

export default function SubscriptionPage() {
  const buttons = {
    planning: [
      {
        name: 'Overview',
        url: `/subscription`,
        icon: <CgProfile />,
        dataTestId: 'user-profile',
        active: true
      },
      {
        name: 'Billing details',
        // url: `/projects/${projectId}/board/${boardId}/backlog`,
        icon: <AiOutlineSetting />,
        dataTestId: 'preference'
      }
    ],
    utilBtns: [
      {
        name: 'Billing history',
        checkAccess: 'view:members',
        // url: `/projects/${currentProject?.id}/members`,
        icon: <BsBriefcase />,
        dataTestId: 'company-details'
      },
      {
        name: 'Manage subscriptions',
        checkAccess: 'view:settings',
        // url: `/settings/${currentProject?.id}`,
        icon: <BsCreditCard />,
        dataTestId: 'plan-and-billing'
      }
    ]
  };

  type BillOverviewInfo = {
    amount: number;
    customerEmail: string;
    customerName: string;
    periodEnd: string;
  };

  const [billOverviewInfo, setBillOverviewInfo] = useState<BillOverviewInfo | null>(null);
  const userInfo = useContext(UserContext);
  const { id: userId } = userInfo;

  // it should render again, but after something changed.
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post(`${config.apiAddress}/billingOverview`, {
        userId
      });
      setBillOverviewInfo(res.data);
    };
    fetchData();
  }, [userId]);

  const {
    amount = 0,
    customerEmail = '',
    customerName = '',
    periodEnd = ''
  } = billOverviewInfo || {};

  useEffect(() => {}, [billOverviewInfo]);

  return (
    <>
      <div className={styles.subscriptionPage}>
        <MainMenuV2 />
        <SubSettingMenu items={buttons} />
        <div className={styles.body}>
          <div className={styles.container}>
            <div className={styles.titleContainer}>
              <div className={styles.admin}>
                <ol className={styles.adminNav}>
                  <li className={styles.firstSpan}>
                    <span>Admin</span>
                  </li>
                  <li>
                    <span>TS</span>
                  </li>
                </ol>
              </div>
              <div>
                <h1>Billing overview</h1>
              </div>
            </div>
            <div className={styles.boxline1}>
              <div className={styles.box1}>
                <h2>Bill estimate</h2>
                <div>
                  <div>
                    <span>USD {amount}</span>
                  </div>
                  <div>Next Charge: {periodEnd}</div>
                </div>
              </div>
              <div className={styles.box2}>
                <h2>{customerEmail}</h2>
                <h2>{customerName}</h2>
                <div />
              </div>
            </div>
            <div className={styles.boxline2}>
              <div className={styles.box3} />
              <div className={styles.box4} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
