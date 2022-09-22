import React from 'react';
import styles from './CareerPage.module.scss';
import careerPage_hero from '../../assets/careerPage/careerPage_hero.png';
import mission_bg from '../../assets/careerPage/mission_bg.svg';
import customer1 from '../../assets/careerPage/customer1.png';
import customer2 from '../../assets/careerPage/customer2.png';
import customer3 from '../../assets/careerPage/customer3.png';
import global_map from '../../assets/careerPage/global_map.svg';
import team_value from '../../assets/careerPage/values.png';
import balance from '../../assets/careerPage/balance.png';
import Header from '../../components/Header/Header';
import JobList from './components/JobList/JobList';
import JobListFooter from './components/JobListFooter/JobListFooter';
import CareerPerks from './components/CareerPerks/CareerPerks';

export default function CareerPage() {
  return (
    <div className={styles.careerPage}>
      <Header />
      <section>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Do career-defining work with us</h1>
            <div className={styles.heroText}>
              Appreciation, communication, and collaboration—when it comes to working together, we
              know a thing or two about teamwork.
            </div>
            <div className={styles.heroCta}>
              <button className={styles.heroCtaBtn}>
                {' '}
                <a href="#jobList">See our open positions</a>
              </button>
              <p className={styles.heroCtaText}>We are hiring!</p>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src={careerPage_hero} alt="hero_image" />
          </div>
        </div>
      </section>
      <section id="jobList">
        <JobList />
      </section>
      <section>
        <div className={styles.careerGlobalContainer}>
          <div className={styles.careerGlobalMap}>
            <img src={customer1} alt="customer1" className={styles.globalCustomer1} />
            <img src={customer2} alt="customer2" className={styles.globalCustomer2} />
            <img src={customer3} alt="customer3" className={styles.globalCustomer3} />
            <img src={global_map} alt="global_map" />
          </div>
          <div className={styles.careerGlobalText}>
            <h1>Our customers are all over the globe—and we are too!</h1>
            <p>
              We believe that work is what you do, not where you sit. Teamwork is proud to provide a{' '}
              <span>remote-friendly</span> work environment, so whether you&apos;re based in Cork,
              Ireland (our headquarters!) or are working from one of our many hubs around the world,
              you&apos;ll be supported by an incredible team.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.careerMission}>
        <div className={styles.missionContainer}>
          <div className={styles.missionBackground}>
            <img src={mission_bg} alt="mission_background" />
          </div>
          <div className={styles.missionText}>
            <h1>
              {' '}
              A team with a <span>mission</span>
            </h1>
            <p>
              We&apos;re on a mission to become the best project management platform for client
              services teams everywhere, but we can&apos;t do it alone.
            </p>
          </div>
          <div className={styles.missionVideo}>
            <div>video</div>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.careerTeamInfoContainer}>
          <div className={styles.careerTeamValue}>
            <div className={styles.careerTeamValueText}>
              <h1>A team with values</h1>
              <p>
                Our name says it all. We always strive to practice what we preach by keeping our
                values at the core of everything we do. From communication to collaboration, we
                believe that teams (and people!) thrive when they&apos;re part of an open,
                inclusive, and diverse workplace.
              </p>
            </div>
            <div className={styles.careerTeamValueImage}>
              <img src={team_value} alt="team_values" />
            </div>
          </div>
          <div className={styles.careerTeamBalance}>
            <div className={styles.careerTeamBalanceImage}>
              <img src={balance} alt="balance" />
            </div>
            <div className={styles.careerTeamBalanceText}>
              <h1>A team with balance</h1>
              <p>
                We know that bringing your whole self to work not only enables you do your best, but
                it also helps you maintain a happy, balanced life. Our team supports one another,
                day in and day out, but we also love giving back to the community. That&apos;s why
                we donate 1% of our profits every year to an employee-selected charity.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <CareerPerks />
      </section>
      <section className={styles.footerSection}>
        <JobListFooter />
      </section>
    </div>
  );
}
