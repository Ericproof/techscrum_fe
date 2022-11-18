import React from 'react';
import { AiFillLinkedin } from 'react-icons/ai';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MaleAvatar from '../../assets/team2/male_avatar.svg';
import FemaleAvatar from '../../assets/team2/female_avatar.svg';
import styles from './AboutPageT2.module.scss';

interface IPeople {
  name: string;
  image?: string;
  role: 'CEO' | 'business analyst' | 'designer' | 'developer' | 'devops';
  linkedin?: string;
  gender: 'male' | 'female';
}

const people: IPeople[] = [
  {
    name: 'kitman yit',
    role: 'CEO',
    gender: 'male',
    linkedin: 'https://www.linkedin.com/in/kitman-yiu/'
  },
  {
    name: 'berlinda wang',
    role: 'business analyst',
    gender: 'female',
    linkedin: 'www.linkedin.com/in/wangbelinda'
  },
  {
    name: 'hyna hua',
    role: 'developer',
    gender: 'female',
    linkedin: 'https://www.linkedin.com/in/hyna-hua/'
  },
  {
    name: 'david guo',
    role: 'developer',
    gender: 'male',
    linkedin: 'www.linkedin.com/in/david-guo-au'
  },
  {
    name: 'joe zhou',
    role: 'developer',
    gender: 'male',
    linkedin: 'https://www.linkedin.com/in/joe-hz/'
  },
  {
    name: 'wendy xu',
    role: 'developer',
    gender: 'male'
  },
  {
    name: 'teddy xiao',
    role: 'developer',
    gender: 'male',
    linkedin: 'https://www.linkedin.com/in/chicheng-xu/'
  },
  {
    name: 'leo guo',
    role: 'devops',
    gender: 'male',
    linkedin: 'https://www.linkedin.com/in/leo-guo/'
  },
  {
    name: 'james liu',
    role: 'devops',
    gender: 'male',
    linkedin: 'http://linkedin.com/in/james-shl'
  },
  {
    name: 'jack chen',
    role: 'devops',
    gender: 'male',
    linkedin: 'http://www.linkedin.com/in/jack-chen-156224256/'
  }
];

const devs = people
  .slice(2)
  .sort((a, b) => a.name.localeCompare(b.name))
  .sort((a, b) => a.role.localeCompare(b.role));

function Person(props: IPeople) {
  const { name, image, gender, role, linkedin } = props;
  return (
    <div>
      <img
        className={styles.personImage}
        src={image || (gender === 'male' ? MaleAvatar : FemaleAvatar)}
        alt={name}
      />
      <p className={styles.name}>{name}</p>
      <div className={styles.description}>
        <p className={styles.role}>{role}</p>
        {linkedin && (
          <a className={styles.link} href={linkedin} target="_blank" rel="noreferrer">
            <AiFillLinkedin className={styles.icon} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function AboutPageT2() {
  return (
    <>
      <Header />
      <section className={styles.container}>
        <h1 className={styles.header}>People who make it happen</h1>
        <hr className={styles.line} />
        <div className={styles.peopleGrid}>
          {people
            .slice(0, 2)
            .concat(devs)
            .map((person) => {
              const { name, gender, image, role, linkedin } = person;
              return (
                <Person
                  key={name}
                  name={name}
                  gender={gender}
                  image={image}
                  role={role}
                  linkedin={linkedin}
                />
              );
            })}
        </div>
      </section>
      <Footer />
    </>
  );
}

Person.defaultProps = {
  image: undefined,
  linkedin: undefined
};
