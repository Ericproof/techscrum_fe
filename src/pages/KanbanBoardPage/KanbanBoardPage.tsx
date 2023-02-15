import React from 'react';
import Fade from 'react-reveal/Fade';
import Header from '../../components/Header/Header';
import shapeLight from '../../assets/shapeLight.png';
import demoVideoOne from '../../assets/demoVideoOne.mp4';
import darkCircle from '../../assets/shapeDark.png';
import styles from './KanbanBoardPage.module.scss';
import DemoVideo from '../../components/DemoVideo/DemoVideo';

export default function KanbanBoardPage() {
  return (
    <div>
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
          <div className={styles.hero}>
            <div className={styles.content}>
              <h1 className={styles.header} data-testid="header-text">
                Create the perfect Agile workflow with Board view.
              </h1>
              <p className={styles.text}>
                Manage your project from start to finish with TechScrum.
              </p>
              <p className={styles.text}>No credit required.</p>
            </div>
            <div className={styles.demo}>
              <DemoVideo src={demoVideoOne} />
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}
