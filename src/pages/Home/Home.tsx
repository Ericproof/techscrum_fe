import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSuitHeartFill } from 'react-icons/bs';
import axios from 'axios';
import styles from './Home.module.scss';
import call from '../../assets/call.svg';
import cover from '../../assets/cover.png';
import rochelle from '../../assets/rochelle.png';
import envelope from '../../assets/envelope.svg';
import boardView from '../../assets/boardView.png';
import kfirPravda from '../../assets/kfirPravda.png';
import projectPlan from '../../assets/projectPlan.png';
import easilyImport from '../../assets/easilyImport.svg';
import rochelleAvatar from '../../assets/rochelleAvatar.png';
import shekharTamasker from '../../assets/shekharTamasker.png';
import samanthaAnderson from '../../assets/samanthaAnderson.png';
import clientOnboarding from '../../assets/clientOnboarding.png';
import projectManagement from '../../assets/projectManagement.png';
import increaseProfitability from '../../assets/increaseProfitability.png';
import realTimeCollaboration from '../../assets/realTimeCollaboration.png';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Home() {
  const isLogin = false;
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/tenants?domain=d&name=dsf').then(() => {
      if (isLogin) {
        navigate('/404');
      }
    });
  }, [isLogin, navigate]);

  return (
    <div>
      <Header />
      <div className={styles.unauthorizePageContainer}>
        <span className={styles.shape2Container}>
          <img
            src="https://themexriver.com/appilo-theme/saas-classic-dark/wp-content/uploads/sites/19/2021/07/b-shape4.png"
            alt=""
          />
        </span>
        <div className={styles.circleContainer}>
          <img
            src="https://themexriver.com/appilo-theme/saas-classic-dark/wp-content/uploads/sites/19/2021/07/b-shape2.png"
            alt=""
          />
        </div>
        <span className={styles.shape3Container}>
          <img
            src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape-3.png"
            alt=""
          />
        </span>
        <span className={styles.shape4Container}>
          <img
            src="https://themexriver.com/appilo-theme/saas-classic-dark/wp-content/uploads/sites/19/2021/07/b-shape3-1.png"
            alt=""
          />
        </span>
        <div className={styles.textContainer}>
          <h1 className={styles.header}>Efficient way of working together</h1>
          <p className={styles.text}>Manage your project from start to finish with TechScrum</p>
          <p className={styles.text}>No credit required.</p>
        </div>
      </div>
      <div className={styles.homePage}>
        <section className={styles.jobDoneSection}>
          <div className={styles.jobDoneContainer}>
            <div className={[styles.jobDoneRows, styles.maxWidth80].join(' ')}>
              <div className={styles.businessPicture}>
                <img src={increaseProfitability} alt="business" />
              </div>
              <div className={[styles.businessContent].join(' ')}>
                <h3>
                  Plan projects and boost <b className={styles.colorMainTheme}>efficiency</b>
                </h3>
                <div className={styles.jobDoneParagraph}>
                  <p>
                    Plan projects and break down each step to getting things done. Instantly see the
                    status of every task and feel a sense of accomplishment. Project management has
                    never been so efficient.
                  </p>
                </div>
                <div className={styles.jobDoneQuote} style={{ display: 'none' }}>
                  <div className={styles.quoteAvatar}>
                    <picture>
                      <img src={kfirPravda} alt="avatar" />
                    </picture>
                  </div>
                  <div className={styles.quoteWrap}>
                    <p className={styles.quoteText}>
                      “My stress is way down because my team members are in the driver&apos;s seat,
                      and I know what&apos;s happening every day.”
                    </p>
                    <div className={styles.quoteAuthor}>
                      <span className={styles.authorName}>Kfir Pravda</span>
                      <span className={styles.authorRole}>Pravda Media</span>
                    </div>
                  </div>
                </div>
              </div>
              <img
                src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
                alt="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
                className={styles.bgImg}
              />
            </div>
            <div className={styles.collaborationRows}>
              <picture>
                <img src={realTimeCollaboration} alt="realTimeCollaboration" />
              </picture>
              <div className={styles.collaborationContent}>
                <h3>
                  Start with a <b className={styles.colorMainTheme}>Techscrum board</b>
                </h3>
                <div className={styles.jobDoneParagraph}>
                  <p>
                    Techscrum board is the easiest way to go from idea to action. View lists and
                    cards in a Kanban board. Customize and expand with more features as your
                    TechScrum grows. Manage projects, organize tasks, and build team spirit—all in
                    one place.
                  </p>
                </div>
                <div className={styles.jobDoneQuote}>
                  <div className={styles.quoteAvatar}>
                    <picture>
                      <img src={samanthaAnderson} alt="avatar" />
                    </picture>
                  </div>
                  <div className={styles.quoteWrap}>
                    <p className={styles.quoteText}>
                      “TechScrum helps me keep up with all the thousands of activities between all
                      our clients. It gives me full oversight on what&apos;s moving and what&apos;s
                      not.”
                    </p>
                    <div className={styles.quoteAuthor}>
                      <span className={styles.authorName}>Samantha Anderson</span>
                      <span className={styles.authorRole}>Account Director</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.projectManagementRow}>
              <div className={styles.projectManagementContent}>
                <h3>Create cards that contain every detail</h3>
                <div className={styles.jobDoneParagraph}>
                  <p>
                    TechScrum card is a place where you can organize your work. Each section of your
                    tasks allows you to manage, track and share with your team. When opening each
                    card, you can unlock an array of functions such as checklists, due dates,
                    attachments, comments, and more.
                  </p>
                </div>
              </div>
              <picture>
                <img src={boardView} alt="board view" />
              </picture>
            </div>
          </div>
        </section>
        <section className={styles.switchingSection} style={{ display: 'none' }}>
          <div className={styles.switchingContainer}>
            <div className={styles.switchingContent}>
              <h3>Switching to TechScrum?</h3>
              <p>Easily import all your tasks and projects in one click.</p>
              <div className={styles.switchingCta}>
                <a
                  className={styles.ctaButton}
                  href="https://www.TechScrum.com/signup/"
                  target="_self"
                >
                  Start Your Free Trial
                </a>
                <p className={styles.ctaText}>No credit card required</p>
              </div>
            </div>
            <picture className={styles.switchingPicture}>
              <img src={easilyImport} alt="brand icons" />
            </picture>
          </div>
        </section>
        <section className={styles.cardsSection}>
          <div className={styles.cardsContainer}>
            <h3>Why Choose TechScrum</h3>
            <div className={styles.cardsParagraph}>
              <p>
                No matter the job, <b className={styles.colorMainTheme}>TechScrum</b> has all the
                tracking data you need
              </p>
            </div>
            <div className={styles.cardsCards}>
              <a
                href="https://www.TechScrum.com/templates/client-onboarding-checklist/"
                target="_self"
                className={styles.eachCards}
              >
                <div className={styles.cardsWrap}>
                  <h4 className={styles.cardsName}>Tracking</h4>
                  <div className={styles.cardsCta}>
                    <div className={styles.cardsHeart}>
                      Techscrum has all the tracking for you so when you are doing review you can
                      find out what happen in what time
                    </div>
                  </div>
                </div>
              </a>
              <a
                href="https://www.TechScrum.com/templates/client-onboarding-checklist/"
                target="_self"
                className={styles.eachCards}
              >
                <div className={styles.cardsWrap}>
                  <h4 className={styles.cardsName}>Best practices </h4>
                  <div className={styles.cardsCta}>
                    <div className={styles.cardsHeart}>
                      We have system that designed to ensure that you can make sure it follows best
                      practices for your PM methodology of choice.
                    </div>
                  </div>
                </div>
              </a>
              <a
                href="https://www.TechScrum.com/templates/client-onboarding-checklist/"
                target="_self"
                className={styles.eachCards}
              >
                <div className={styles.cardsWrap}>
                  <h4 className={styles.cardsName}>Save time</h4>
                  <div className={styles.cardsCta}>
                    <div className={styles.cardsHeart}>
                      Reduce the time spent on manual admin without sacrificing on detail or
                      efficiency. With our project plan, you can quickly create tried-and-trusted
                      project management plans in seconds.
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className={styles.cardsButtons}>
              <a
                className={styles.ctaButton}
                href="https://www.TechScrum.com/signup/"
                target="_self"
              >
                Start Your Free Trial
              </a>
            </div>
          </div>
        </section>
        <section className={styles.clientsSection}>
          <div className={styles.clientsContainer}>
            <picture>
              <img src={rochelle} alt="Profile" />
            </picture>
            <div className={styles.clientsContent}>
              <h3>Clients actually use it with me!</h3>
              <p>
                TechScrum was built so you can manage ALL your client work in one platform. From
                invoicing, to time tracking, to unlimited client access, everything you need to run
                your client services is in TechScrum.
              </p>
              <div className={styles.clientsQuote}>
                <div className={styles.quoteAvatar}>
                  <picture>
                    <img src={rochelleAvatar} alt="avatar" />
                  </picture>
                </div>
                <div className={styles.quoteWrap}>
                  <p className={styles.quoteText}>
                    “TechScrum is the first project management tool that I&apos;ve been able to get
                    clients to actually use with me. I&apos;ve tried Asana and Trello, and clients
                    just ignored them.”
                  </p>
                  <div className={styles.quoteAuthor}>
                    <span className={styles.authorName}>Rochelle Broder-Singer</span>
                    <span className={styles.authorRole}>President/Chief Word Wrangler</span>
                  </div>
                </div>
              </div>
              <div className={styles.clientsCta}>
                <a
                  className={styles.ctaButton}
                  href="https://www.TechScrum.com/signup/"
                  target="_self"
                >
                  Start Your Free Trial
                </a>
                <p className={styles.ctaText}>No credit card required</p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.supportSection}>
          <div className={styles.supportContainer}>
            <div className={styles.supportContent}>
              <h3>
                <span>Support</span> that&apos;s here for you when you need them
              </h3>
              <p>
                Our support team delivers first-class customer support around the clock. We&apos;re
                here to answer any question and help every step of the way.
              </p>
              <div className={styles.supportButtons}>
                <a
                  href="https://www.TechScrum.com/contact/"
                  target="_blank"
                  className={styles.supportContact}
                  rel="noreferrer"
                >
                  <picture>
                    <img src={envelope} alt="envelope" />
                  </picture>
                  <span>Contact</span>
                </a>
              </div>
              <div className={styles.supportQuote} style={{ display: 'none' }}>
                <div className={styles.quoteAvatar}>
                  <picture>
                    <img src={shekharTamasker} alt="avatar" />
                  </picture>
                </div>
                <div className={styles.quoteWrap}>
                  <p className={styles.quoteText}>
                    “What reassured us was TechScrum&apos;s reliable and prompt customer service. If
                    ever an issue came up, TechScrum replied and resolved it promptly.”
                  </p>
                  <div className={styles.quoteAuthor}>
                    <span className={styles.authorName}>Shekhar Tamasker</span>
                    <span className={styles.authorRole}>
                      Section Head of Scheduling and Reporting
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <picture className={styles.supportPicture}>
              <img src={cover} alt="cover" />
            </picture>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
