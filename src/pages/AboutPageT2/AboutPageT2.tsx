import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MaleAvatar from '../../assets/team2/male_avatar.svg';
import FemaleAvatar from '../../assets/team2/female_avatar.svg';
import styles from './AboutPageT2.module.scss';

interface IPeople {
  name: string;
  image?: string;
  role: 'CEO' | 'business analyst' | 'designer' | 'developer' | 'devops';
  gender: 'male' | 'female';
}

const people: IPeople[] = [
  {
    name: 'kitman yit',
    role: 'CEO',
    gender: 'male'
  },
  {
    name: 'berlinda wang',
    role: 'business analyst',
    gender: 'female'
  },
  {
    name: 'hyna hua',
    role: 'developer',
    gender: 'female'
  },
  {
    name: 'david guo',
    role: 'developer',
    gender: 'male'
  },
  {
    name: 'joe zhou',
    role: 'developer',
    gender: 'male'
  },
  {
    name: 'wendy xu',
    role: 'developer',
    gender: 'male'
  },
  {
    name: 'teddy xiao',
    role: 'developer',
    gender: 'male'
  },
  {
    name: 'leo guo',
    role: 'devops',
    gender: 'male'
  },
  {
    name: 'james liu',
    role: 'devops',
    gender: 'male'
  },
  {
    name: 'jack chen',
    role: 'devops',
    gender: 'male'
  }
];

const devs = people
  .slice(2)
  .sort((a, b) => a.name.localeCompare(b.name))
  .sort((a, b) => a.role.localeCompare(b.role));

function Person(props: IPeople) {
  const { name, image, gender, role } = props;
  return (
    <div>
      <img
        className={styles.personImage}
        src={image || (gender === 'male' ? MaleAvatar : FemaleAvatar)}
        alt={name}
      />
      <p className={styles.description}>{name}</p>
      <p className={[styles.description, styles.personRole].join(' ')}>{role}</p>
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
              const { name, gender, image, role } = person;
              return <Person key={name} name={name} gender={gender} image={image} role={role} />;
            })}
        </div>
      </section>
      <Footer />
    </>
  );
}

Person.defaultProps = {
  image: undefined
};
