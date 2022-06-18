import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSuitHeartFill } from 'react-icons/bs';
import axios from 'axios';
import { autoLogin } from '../../api/login/login';
import styles from './Home.module.scss';
import call from '../../assets/call.svg';
import cover from '../../assets/cover.png';
import reneeR from '../../assets/reneeR.png';
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
import Footer from '../../components/Footer/index';

export default function Home() {
  const isLogin = false;
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/tenants?domain=d&name=dsf').then((res) => {
      if (isLogin) {
        navigate('/404');
      }
    });
  }, []);

  useEffect(() => {
    async function tokenCheck() {
      const tokenValidationFlag = await autoLogin();
      if (tokenValidationFlag.result) navigate('/project');
    }
    tokenCheck();
  });

  return (
    <div>
      <Header />
      <h1 className={styles.header}>Static Routes</h1>
      <p>Home</p>
      <div className={styles.homePage}>
        <section className={styles.jobDoneSection}>
          <div className={styles.jobDoneContainer}>
            <div className={styles.jobDoneHeader}>
              <h3>
                Ship
                <span className={styles.headerPink}> faster </span> and
                <span className={styles.headerIndigo}> reliably </span>
                with TechScrum
              </h3>
              <p className={styles.jobDoneText}>
                TechScrum delivers them all so you can reach every milestone
              </p>
            </div>
            <div className={styles.jobDoneRows}>
              <div className={styles.businessPicture}>
                <img src={increaseProfitability} alt="business" />
              </div>
              <div className={styles.businessContent}>
                <h3>Increase profitability and grow your business</h3>
                <div className={styles.jobDoneParagraph}>
                  <p>
                    TechScrum gives you the tools and reports you need to maximize resources and
                    never miss a billable minute again. Get a bird&apos;s eye view of every project,
                    from milestones to
                    <a href="https://www.teamwork.com/solutions/project-planning/">
                      {' '}
                      project planning
                    </a>
                    , budgeting,
                    <a href="https://www.teamwork.com/project-management-software/project-time-tracking-software/">
                      {' '}
                      time tracking
                    </a>
                    , and more.
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
                <div className={styles.jobDoneCta}>
                  <a
                    className={styles.ctaButton}
                    href="https://www.teamwork.com/signup/"
                    target="_self"
                  >
                    Start Your Free Trial
                  </a>
                  <p className={styles.ctaText}>No credit card required</p>
                </div>
              </div>
            </div>
            <div className={styles.collaborationRows}>
              <picture>
                <img src={realTimeCollaboration} alt="realTimeCollaboration" />
              </picture>
              <div className={styles.collaborationContent}>
                <h3>Features to help your team succeed</h3>
                <div className={styles.jobDoneParagraph}>
                  <p>
                    Log activities such as delay time and daily scrum meeting notes. Which can help
                    you find why projects delays so that and ensure delivers them on time and on
                    budget
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
                <div className={styles.jobDoneCta}>
                  <a
                    className={styles.ctaButton}
                    href="https://www.teamwork.com/signup/"
                    target="_self"
                  >
                    Start Your Free Trial
                  </a>
                  <p className={styles.ctaText}>No credit card required</p>
                </div>
              </div>
            </div>
            <div className={styles.projectManagementRow}>
              <div className={styles.projectManagementContent}>
                <h3>The last project management tool you&apos;ll ever use</h3>
                <div className={styles.jobDoneParagraph}>
                  <p>
                    From PM essentials like project templates,
                    <a href="https://www.teamwork.com/solutions/task-management-software/">
                      {' '}
                      task management
                    </a>
                    , and custom fields to wishlist favorites like time tracking, billing,
                    <a href="https://www.teamwork.com/project-management-software/gantt-chart/">
                      {' '}
                      gantt chart
                    </a>
                    , and assigning cards to multiple team members, TechScrum has you covered.
                  </p>
                </div>
                <div className={styles.jobDoneQuote}>
                  <div className={styles.quoteAvatar}>
                    <picture>
                      <img src={reneeR} alt="avatar" />
                    </picture>
                  </div>
                  <div className={styles.quoteWrap} style={{ display: 'none' }}>
                    <p className={styles.quoteText}>
                      “TechScrum is the first thing I open and the last thing I close: it tells me
                      what happened when I was asleep, what I need to do that day, and it helps me
                      plan for the future.”
                    </p>
                    <div className={styles.quoteAuthor}>
                      <span className={styles.authorName}>Renee R</span>
                      <span className={styles.authorRole}>Project manager</span>
                    </div>
                  </div>
                </div>
                <div className={styles.jobDoneCta}>
                  <a
                    className={styles.ctaButton}
                    href="https://www.teamwork.com/signup/"
                    target="_self"
                  >
                    Start Your Free Trial
                  </a>
                  <p className={styles.ctaText}>No credit card required</p>
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
                  href="https://www.teamwork.com/signup/"
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
            <h3>
              Skip the learning curve and start immediately with our pre-built{' '}
              <span>templates</span>
            </h3>
            <div className={styles.cardsParagraph}>
              <p>
                No matter the job, <span>TechScrum</span> has a template to get it done. Whether you
                or your client is in marketing, operations, creative, engineering, or IT -
                we&apos;ve got you covered.
              </p>
            </div>
            <div className={styles.cardsCards}>
              <a
                href="https://www.teamwork.com/templates/project-management/"
                target="_self"
                className={styles.eachCards}
              >
                <picture>
                  <img src={projectManagement} alt="project management" />
                </picture>
                <div className={styles.cardsWrap}>
                  <span className={styles.cardsTag}>Project Management</span>
                  <h4 className={styles.cardsName}>Project management</h4>
                  <div className={styles.cardsCta}>
                    <div className={styles.cardsHeart}>
                      <BsSuitHeartFill />
                      <span>Popular</span>
                    </div>
                    <button type="button">View template</button>
                  </div>
                </div>
              </a>
              <a
                href="https://www.teamwork.com/templates/website-project-plan/"
                target="_self"
                className={styles.eachCards}
              >
                <picture>
                  <img src={projectPlan} alt="project plan" />
                </picture>
                <div className={styles.cardsWrap}>
                  <span className={styles.cardsTag}>IT</span>
                  <h4 className={styles.cardsName}>Website project plan</h4>
                  <div className={styles.cardsCta}>
                    <div className={styles.cardsHeart}>
                      <BsSuitHeartFill />
                      <span>Popular</span>
                    </div>
                    <button type="button">View template</button>
                  </div>
                </div>
              </a>
              <a
                href="https://www.teamwork.com/templates/client-onboarding-checklist/"
                target="_self"
                className={styles.eachCards}
              >
                <picture>
                  <img src={clientOnboarding} alt="client onboarding" />
                </picture>
                <div className={styles.cardsWrap}>
                  <span className={styles.cardsTag}>Operations</span>
                  <h4 className={styles.cardsName}>New Client Onboarding</h4>
                  <div className={styles.cardsCta}>
                    <div className={styles.cardsHeart}>
                      <BsSuitHeartFill />
                      <span>Popular</span>
                    </div>
                    <button type="button">View template</button>
                  </div>
                </div>
              </a>
            </div>
            <div className={styles.cardsButtons}>
              <a
                className={styles.ctaButton}
                href="https://www.teamwork.com/signup/"
                target="_self"
              >
                Start Your Free Trial
              </a>
              <a
                className={styles.viewTemplateButton}
                href="https://www.teamwork.com/templates/"
                target="_self"
              >
                View template library
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
                  href="https://www.teamwork.com/signup/"
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
                  href="https://www.teamwork.com/tel:+18448198453"
                  target="_blank"
                  className={styles.supportCall}
                  rel="noreferrer"
                >
                  <picture>
                    <img src={call} alt="phone" />
                  </picture>
                  <span>Call</span>
                </a>
                <a
                  href="https://www.teamwork.com/contact/"
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
