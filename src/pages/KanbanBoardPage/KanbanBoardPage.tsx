import React from 'react';
import Fade from 'react-reveal/Fade';
import { HiOutlineMailOpen, HiCheck } from 'react-icons/hi';
import Header from '../../components/Header/Header';
import shapeLight from '../../assets/shapeLight.png';
import darkCircle from '../../assets/shapeDark.png';
import styles from './KanbanBoardPage.module.scss';
import DemoVideo from '../../components/DemoVideo/DemoVideo';
import FeatureSection from '../../components/FeatureSection/FeatureSection';
import PolicyMediaTabs from '../../components/Footer/PolicyMediaTabs/PolicyMediaTabs';

const featureSectionPropsObjs = [
  {
    subTitle: 'flexible grouping',
    title: 'Group your Boards your way.',
    desc: 'Arrange your columns to analyze projects from any angle. Group by status, assignee, priority, and more.'
  },
  {
    subTitle: 'everything view',
    title: 'See all your Boards in one view.',
    desc: 'Get an overview of where all your team projects stand at a glance with Everything view. See multiple workflows in one view, even if they have different statuses.'
  },
  {
    subTitle: 'custom statuses',
    title: 'Visualize any process with Custom Statuses.',
    desc: 'Create unique statuses for any workflow, from sprints to multi-stage processes. Add new statuses or edit existing ones directly in Board view.'
  },
  {
    subTitle: 'drag & drop',
    title: 'Drag-and-drop your updates.',
    desc: 'Quickly move tasks through workflows and adjust priorities. Drag and drop a task into any status and move the task up or down to change the priority of the task.'
  },
  {
    subTitle: 'bulk action toolbar',
    title: 'Make quick changes in bulk.',
    desc: 'Save time making task updates in bulk with the Bulk Action Toolbar. Add assignees, change statuses, and delete tasks, all without leaving Board view.'
  }
];

export default function KanbanBoardPage() {
  return (
    <div className={styles.page}>
      <Header />
      <Fade>
        <div className={styles.unauthorizePageContainer}>
          <span className={styles.shape2Container}>
            <img src={shapeLight} alt="" />
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
            <img src={darkCircle} alt="" />
          </span>
          <section className={styles.hero}>
            <div className={styles.content}>
              <h1 className={styles.header} data-testid="header-text">
                Create the perfect Agile workflow with Board view.
              </h1>
              <p className={styles.text}>
                Build a flexible Kanban system to visualize your work and improve project
                management.
              </p>
              <form className={`${styles.form} ${styles.flex_col}`}>
                <div className={styles.email__wrapper}>
                  <input
                    type="email"
                    className={styles.email__input}
                    placeholder="Your work email"
                    required
                  />
                  <HiOutlineMailOpen className={styles.email__icon} />
                </div>
                <button type="submit" className={styles.start__btn}>
                  Get Started
                </button>
              </form>
            </div>
            <div className={styles.demo}>
              <DemoVideo src="https://clickup.com/videos/features/kanban-board/board-view-agile-inventory.mp4" />
            </div>
          </section>
        </div>
      </Fade>
      {featureSectionPropsObjs.map((e, i) => (
        <FeatureSection
          key={e.desc}
          subTitle={e.subTitle}
          title={e.title}
          desc={e.desc}
          layout={i % 2 === 0 ? 'left' : 'right'}
        />
      ))}
      <section className={styles.section_two}>
        <p className={styles.header__before}>visualize</p>
        <h2 className={styles.header}>Organize work and assess bandwidth.</h2>
        <div className={styles.container}>
          <div className={styles.card}>
            <img
              src="https://clickup.com/images/features/kanban-board/board-view-fiter.png"
              alt="demo"
            />
            <h3>Stay on track with sorting and filtering.</h3>
            <ul>
              <li>
                <HiCheck className={styles.listIcon} />
                <span>Sort tasks in a column by due date, priority, and more</span>
              </li>
              <li>
                <HiCheck className={styles.listIcon} />
                <span>Filter tasks by assignee to only see your work</span>
              </li>
              <li>
                <HiCheck className={styles.listIcon} />
                <span>Add filtered views to your Favorites for future reference</span>
              </li>
            </ul>
          </div>
          <div className={`${styles.card} ${styles.pink}`}>
            <img
              src="https://clickup.com/images/features/kanban-board/board-view-fiter.png"
              alt="demo"
            />
            <h3>Monitor capacity with Work in Progress Limits.</h3>
            <ul>
              <li>
                <HiCheck className={styles.listIcon} />
                <span>Easily see when there&#39;s too much work in a status</span>
              </li>
              <li>
                <HiCheck className={styles.listIcon} />
                <span>Measure workload by sprint points, time estimates, and more</span>
              </li>
              <li>
                <HiCheck className={styles.listIcon} />
                <span>Spot bottlenecks at a glance to ship projects faster</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className={styles.supportSection}>
        <div className={styles.card}>
          <h2>Save one day every week with TechScrum&#39;s Board view.</h2>
          <form className={`${styles.form} ${styles.form__row}`}>
            <div className={styles.email__wrapper}>
              <input
                type="email"
                className={styles.email__input}
                placeholder="Your work email"
                required
              />
              <HiOutlineMailOpen className={styles.email__icon} />
            </div>
            <button type="submit" className={styles.start__btn}>
              Get Started
            </button>
          </form>
        </div>
        <div className={styles.flexContainer}>
          <div className={styles.flex__row}>
            <img
              className={styles.imgIcons}
              src="https://clickup.com/images/kindness/free-training.svg"
              alt="icons"
            />
            <p>
              <a href="/">Free training</a> & 24-hour support
            </p>
          </div>
          <div className={styles.flex__row}>
            <img
              className={styles.imgIcons}
              src="https://clickup.com/images/kindness/security.svg"
              alt="icons"
            />
            <p>
              Serious about <a href="/">security & privacy</a>
            </p>
          </div>
          <div className={styles.flex__row}>
            <img
              className={styles.imgIcons}
              src="https://clickup.com/images/kindness/uptime.svg"
              alt="icons"
            />
            <p>
              <a href="/">Highest levels of uptime</a> the last 12 months
            </p>
          </div>
        </div>
      </section>
      <footer style={{ flexWrap: 'wrap' }}>
        <PolicyMediaTabs />
      </footer>
    </div>
  );
}
