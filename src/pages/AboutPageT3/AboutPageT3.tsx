import React, { useState } from 'react';
import styles from './AboutPageT3.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import StaffInfo from './components/StaffInfo';
import Kitman from '../../assets/kitman.jpg';
import David from '../../assets/team2/david_guo.webp';
import Hyna from '../../assets/team2/hyna_hua.webp';
import joe from '../../assets/team3/joe.jpg';

interface IStaff {
  name: string;
  description?: string;
  image?: string;
  linkedin?: string;
  gender: 'male' | 'female';
  position: 'ceo' | 'business analyst' | 'developer';
}

const staffs: IStaff[] = [
  {
    name: 'kitman yiu',
    image: Kitman,
    linkedin: 'https://www.linkedin.com/in/kitman-yiu/',
    gender: 'male',
    position: 'ceo',
    description:
      'Managing Project deadline to ensure issues can be finish on time Resolving commutation issue between dev, designer and product manager Improving CI/CD pipeline for dev teams, introducing new tech stack to dev team'
  },
  {
    name: 'david guo',
    description: ``,
    image: David,
    linkedin: 'https://www.linkedin.com/in/david-guo-au',
    gender: 'male',
    position: 'developer'
  },
  {
    name: 'wendy xu',
    description: ``,
    linkedin: 'https://www.linkedin.com/in/chicheng-xu/',
    gender: 'male',
    position: 'developer'
  },
  {
    name: 'hyna hua',
    description: ``,
    image: Hyna,
    linkedin: 'https://www.linkedin.com/in/hyna-hua/',
    gender: 'female',
    position: 'business analyst'
  },
  {
    name: 'Jason',
    description: ``,
    linkedin: 'https://www.linkedin.com/in/david-guo-au',
    gender: 'male',
    position: 'developer'
  },
  {
    name: 'Angela',
    description: ``,
    linkedin: 'https://www.linkedin.com/in/david-guo-au',
    gender: 'female',
    position: 'developer'
  },
  {
    name: 'Zhou Tian',
    description: `Finished my Full stack boot camp lately and now building up profile and some side projects on my own. Looking forward to keep learning and improving my web dev skills.`,
    linkedin: 'https://www.linkedin.com/in/zhou-anthony-tian-19b017143/',
    gender: 'male',
    position: 'developer',
    image: joe
  },
  {
    name: 'Charles',
    description: ``,
    linkedin: 'https://www.linkedin.com/in/david-guo-au',
    gender: 'male',
    position: 'developer'
  },
  {
    name: 'Zijun Li',
    description: ``,
    linkedin: 'https://www.linkedin.com/in/david-guo-au',
    gender: 'male',
    position: 'developer'
  }
];

function AboutPageT3() {
  const [activeBtn, setActiveBtn] = useState('ceo');
  const positions = ['ceo', 'business analyst', 'developer', 'all'];

  const onClickHandler = (e) => {
    setActiveBtn(e.currentTarget.id);
  };

  const positionNav = positions.map((position) => {
    return (
      <li
        key={position}
        id={position}
        onClick={onClickHandler}
        role="presentation"
        className={activeBtn === position ? styles.active : ' '}
      >
        {position}
      </li>
    );
  });

  const selectedPosition = staffs
    .filter((staff) => {
      if (activeBtn === 'all') {
        return staff;
      }
      return staff.position === activeBtn;
    })
    .map((staff) => {
      const { name, gender, image, position } = staff;
      return (
        <div key={name}>
          <StaffInfo key={name} name={name} image={image} gender={gender} position={position} />
        </div>
      );
    });

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>
          Meet the <b>team.</b>
        </h2>
        <div>
          <ul className={styles.positionFilter}>{positionNav}</ul>
        </div>
        <div>{selectedPosition}</div>
      </div>
      <Footer />
    </>
  );
}

export default AboutPageT3;
