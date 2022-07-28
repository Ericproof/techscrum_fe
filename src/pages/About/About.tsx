import React from 'react';
import styles from './About.module.scss';
import memberPicture from './MemberPicture/xiaowanzi.jpeg';
import linkedinPicture from './MemberPicture/linkedin.png';
import kitmanImg from '../../assets/kitman.jpg';

export default function About() {
  return (
    <div className={styles.aboutMain}>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutTextCenter}>
          <p>our team</p>
        </div>
        <div className={styles.aboutRow}>
          <p>Leader</p>
          <div className={styles.leader}>
            <ul className={styles.aboutList}>
              <li id={styles.listImage}>
                <img className={styles.memberImg} src={kitmanImg} alt="Kitman" />
              </li>
              <li id={styles.listName}>Kitman</li>
              <li id={styles.listPosition}>Manger</li>
              <li>
                <a href="https://www.linkedin.com/in/kitman-yiu">
                  <img className={styles.inputImg} src={linkedinPicture} alt="linkedin" />
                </a>
              </li>
            </ul>
          </div>
          <p>BA</p>
          <div className={styles.ba}>
            <ul className={styles.aboutList}>
              <li id={styles.listImage}>
                <img className={styles.memberImg} src={memberPicture} alt="Belinda" />
              </li>
              <li id={styles.listName}>Belinda</li>
              <li id={styles.listPosition}>BA</li>
              <li>
                <a href="https://www.linkedin.com/home">
                  <img className={styles.inputImg} src={linkedinPicture} alt="linkedin" />
                </a>
              </li>
            </ul>
          </div>
          <p>Developer</p>
          <div className={styles.developer}>
            <ul className={styles.aboutList}>
              <li id={styles.listImage}>
                <img className={styles.memberImg} src={memberPicture} alt="Emil" />
              </li>
              <li id={styles.listName}>Emil</li>
              <li id={styles.listPosition}>Team Leader</li>
              <li>
                <a href="https://www.linkedin.com/home">
                  <img className={styles.inputImg} src={linkedinPicture} alt="linkedin" />
                </a>
              </li>
            </ul>
            <ul className={styles.aboutList}>
              <li id={styles.listImage}>
                <img className={styles.memberImg} src={memberPicture} alt="Hyna" />
              </li>
              <li id={styles.listName}>Hyna</li>
              <li id={styles.listPosition}>Developer</li>
              <li>
                <a href="https://www.linkedin.com/home">
                  <img className={styles.inputImg} src={linkedinPicture} alt="linkedin" />
                </a>
              </li>
            </ul>
            <ul className={styles.aboutList}>
              <li id={styles.listImage}>
                <img className={styles.memberImg} src={memberPicture} alt="Vanny" />

                <li id={styles.listName}>Vanny</li>
                <li id={styles.listPosition}>Developer</li>
              </li>
              <li>
                <a href="https://www.linkedin.com/home">
                  <img className={styles.inputImg} src={linkedinPicture} alt="linkedin" />
                </a>
              </li>
            </ul>
            <ul className={styles.aboutList}>
              <li id={styles.listImage}>
                <img className={styles.memberImg} src={memberPicture} alt="Talisa" />
              </li>
              <li id={styles.listName}>Talisa</li>
              <li id={styles.listPosition}>Developer</li>
              <li>
                <a href="https://www.linkedin.com/home">
                  <img className={styles.inputImg} src={linkedinPicture} alt="linkedin" />
                </a>
              </li>
            </ul>
            <ul className={styles.aboutList}>
              <li id={styles.listImage}>
                <img className={styles.memberImg} src={memberPicture} alt="Regan" />
              </li>
              <li id={styles.listName}>Regan</li>
              <li id={styles.listPosition}>Developer</li>
              <li>
                <a href="https://www.linkedin.com/home">
                  <img className={styles.inputImg} src={linkedinPicture} alt="linkedin" />
                </a>
              </li>
            </ul>
            <ul className={styles.aboutList}>
              <li id={styles.listImage}>
                <img className={styles.memberImg} src={memberPicture} alt="Evan" />
              </li>
              <li id={styles.listName}>Evan</li>
              <li id={styles.listPosition}>Developer</li>
              <li>
                <a href="https://www.linkedin.com/home">
                  <img className={styles.inputImg} src={linkedinPicture} alt="linkedin" />
                </a>
              </li>
            </ul>
          </div>
          <p>DevOps</p>
          <div className={styles.dev}>
            <ul className={styles.aboutList}>
              <li id={styles.listImage}>
                <img className={styles.memberImg} src={memberPicture} alt="Ryan" />
              </li>
              <li id={styles.listName}>Ryan</li>
              <li id={styles.listPosition}>DevOps</li>
              <li>
                <a href="https://www.linkedin.com/home">
                  <img className={styles.inputImg} src={linkedinPicture} alt="linkedin" />
                </a>
              </li>
            </ul>
            <ul className={styles.aboutList}>
              <li id={styles.listImage}>
                <img className={styles.memberImg} src={memberPicture} alt="Lois" />
              </li>
              <li id={styles.listName}>Lois</li>
              <li id={styles.listPosition}>DevOps</li>
              <li>
                <a href="https://www.linkedin.com/home">
                  <img className={styles.inputImg} src={linkedinPicture} alt="linkedin" />
                </a>
              </li>
            </ul>
            <ul className={styles.aboutList}>
              <li id={styles.listImage}>
                <img className={styles.memberImg} src={memberPicture} alt="Flynn" />
              </li>
              <li id={styles.listName}>Flynn</li>
              <li id={styles.listPosition}>DevOps</li>
              <li>
                <a href="https://www.linkedin.com/home">
                  <img className={styles.inputImg} src={linkedinPicture} alt="linkedin" />
                </a>
              </li>
            </ul>
            <ul className={styles.aboutList}>
              <li id={styles.listImage}>
                <img className={styles.memberImg} src={memberPicture} alt="Valerie" />
              </li>
              <li id={styles.listName}>Valerie</li>
              <li id={styles.listPosition}>DevOps</li>
              <li>
                <a href="https://www.linkedin.com/home">
                  <img className={styles.inputImg} src={linkedinPicture} alt="linkedin" />
                </a>
              </li>
            </ul>
            <ul className={styles.aboutList}>
              <li id={styles.listImage}>
                <img className={styles.memberImg} src={memberPicture} alt="Mingshan" />
              </li>
              <li id={styles.listName}>Mingshan</li>
              <li id={styles.listPosition}>DevOps</li>
              <li>
                <a href="https://www.linkedin.com/home">
                  <img className={styles.inputImg} src={linkedinPicture} alt="linkedin" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
