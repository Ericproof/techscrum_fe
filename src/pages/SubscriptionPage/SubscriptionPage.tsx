import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './SubscriptionPage.module.scss';
import SubSettingMenu from '../../lib/SubSettingMenu/SubSettingMenu';
import MainMenuV2 from '../MainMenuV2/MainMenuV2';
import config from '../../config/config';
import { UserContext } from '../../context/UserInfoProvider';
import { paymentButtons } from '../../utils/billingButtons';
import folder from '../../assets/billingFolder.svg';
import InvoiceRow from '../BillingHistoryPage/InvoiceRow/InvoiceRow';
import { checkIsUserSubscribePlan, fetchBillingOverview } from '../../utils/paymentUtils';

export default function SubscriptionPage() {
  type BillOverviewInfo = {
    amount: number;
    planName: string;
    customerEmail: string;
    customerName: string;
    periodStart: string;
    periodEnd: string;
    freeTrialDuration: number;
  };

  type Invoice = {
    id: string;
    stripeInvoiceId: string;
    invoiceNumber: string;
    invoiceURL: string;
    isRefund: boolean;
    __v: number;
  };

  const [billOverviewInfo, setBillOverviewInfo] = useState<BillOverviewInfo | null>(null);
  const [isSubscrbePlan, setIsSubscribePlan] = useState(false);
  const [adminInvoice, setAdminInvoice] = useState<Invoice[]>([]);
  const userInfo = useContext(UserContext);
  const navigate = useNavigate();
  const { id: userId } = userInfo;
  const domainURL = `${window.location.hostname}:${window.location.port}`;

  const {
    amount = 0,
    customerEmail = '',
    customerName = '',
    periodEnd = ''
  } = billOverviewInfo || {};

  // it should render again, but after something changed.
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchBillingOverview(userId);
      setBillOverviewInfo(res);
    };

    const checkIsUserSubscribe = async () => {
      const res = await checkIsUserSubscribePlan();
      setIsSubscribePlan(res);
    };

    const fetchLatestInvoice = async () => {
      const res = await axios.get(`${config.apiAddress}/payment/info/billingHistory`, {});
      setAdminInvoice(res.data);
    };

    fetchData();
    checkIsUserSubscribe();
    fetchLatestInvoice();
  }, [domainURL, userId]);

  const onHandleChange = () => {
    const url = '/billing/info/detail';
    navigate(url);
  };

  return (
    <>
      <div className={styles.subscriptionPage}>
        <MainMenuV2 />
        <SubSettingMenu items={paymentButtons} />
        <div className={styles.body}>
          <div className={styles.container}>
            <div className={styles.titleContainer}>
              <div>
                <h1>Billing overview</h1>
              </div>
            </div>
            <div className={styles.boxline1}>
              <div className={styles.box1}>
                <h2>Bill estimate</h2>
                {isSubscrbePlan ? (
                  <div>
                    <div>
                      <span>USD {amount}</span>
                    </div>
                    <div>Next Charge: {periodEnd}</div>
                  </div>
                ) : (
                  <div>
                    <span>USD 0.0</span>
                  </div>
                )}
              </div>
              <div className={styles.box2}>
                <h2>Billing details</h2>
                {isSubscrbePlan ? (
                  <div>
                    <hr />
                    <div>
                      <button type="button" onClick={onHandleChange}>
                        Update payment method
                      </button>
                    </div>
                    <p className={styles.notification}>
                      We accept all major credit/debit cards and PayPal
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>Required when you have a subscription to at least one paid product.</p>
                    <hr />
                    <div>
                      <button>Add payment method</button>
                    </div>
                    <p className={styles.notification}>
                      We accept all major credit/debit cards and PayPal
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.boxline2}>
              <div className={styles.box3}>
                <h2>Billing history</h2>
                <div>
                  {adminInvoice?.length > 0 ? (
                    <table>
                      <thead className={styles.tableRow}>
                        <tr className={styles.tableRow}>
                          <th className={styles.tableHeader}>Product</th>
                          <th className={styles.tableHeader}>Plan</th>
                          <th className={styles.tableHeader}>Amount</th>
                          <th className={styles.tableHeader}>Period</th>
                          <th className={styles.tableHeader}>Invoice</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminInvoice.map((e: Invoice) => (
                          <InvoiceRow invoice={e} key={e.id} />
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <>
                      <img src={folder} alt="folder" className={styles.folderImage} />
                      <h2 className={styles.textCenter}>You currently have no bills</h2>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.box4}>
                <h2>Billing contacts</h2>
                <div>
                  <div className={styles.icon} />
                  <div className={styles.userInfo}>
                    <h2>{customerName}</h2>
                    <h2>{customerEmail}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
