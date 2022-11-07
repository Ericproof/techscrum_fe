import React from 'react';
import { TiTick } from 'react-icons/ti';
import { BsBoxSeam } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import styles from './Prevent.module.scss';
import itemDetails from '../../../assets/item_details-2.png';

export default function Prevent() {
  return (
    <div className={[styles.jobDoneRows].join(' ')}>
      <div className={[styles.container, styles.row, styles.projectManagement].join(' ')}>
        <Fade up>
          <div className={[styles.businessContent].join(' ')}>
            <p className={styles.eyebrow}>
              <BsBoxSeam className={[styles.eyebrowIcon, 'primaryColor'].join(' ')} /> Logging
            </p>
            <h3>Prevent issue from delaying</h3>
            <div className={styles.jobDoneParagraph}>
              <ul>
                <li>
                  <TiTick />
                  Decppision makingd
                </li>
                <li>
                  <TiTick /> Daisdfly Sdigm
                </li>
                <li>
                  <TiTick />
                  Product Design Doc
                </li>
                <li>
                  <TiTick />
                  Backlog Issues
                </li>
              </ul>
              <div className={['flex', styles.links].join(' ')}>
                <Link className={styles.button} to="/register">
                  Try TechScrum free
                </Link>
                <Link className={styles.link} to="/register">
                  Take a Product tour {'>'}
                </Link>
              </div>
            </div>
          </div>
        </Fade>
        <Zoom>
          <div className={styles.businessPicture}>
            <img src={itemDetails} alt="business" />
          </div>
        </Zoom>
      </div>
    </div>
  );
}
