import React, { useState } from 'react';
import {
  AiOutlineFieldTime,
  AiOutlineBarChart,
  AiOutlineLaptop,
  AiOutlineUserAdd,
  AiOutlineDisconnect,
  AiOutlineTeam,
  AiOutlineFundProjectionScreen,
  AiTwotoneSwitcher,
  AiOutlineAliwangwang
} from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styles from './ServicesTabs.module.scss';
import OneColumnsMenu from './OneColumnMenu/OneColumnMenu';

interface Props {
  show: boolean;
}

const features = {
  content: {
    title: 'Features',
    content: [
      {
        icon: AiOutlineFieldTime,
        title: 'Resource Management',
        description: 'Manage your team&apos;s short team and long term resources',
        href: '/#'
      },
      {
        icon: AiOutlineBarChart,
        title: 'Kanban boards',
        description: 'Automate your workflow and visualiza project tasks',
        href: '/#'
      },
      {
        icon: AiOutlineLaptop,
        title: 'Time Tracking',
        description: 'Deliver a more collaborative client experience',
        href: '/#'
      },
      {
        icon: AiOutlineUserAdd,
        title: 'Unlimited client users',
        description: 'Deliver a more collaborative client experience',
        href: '/#'
      }
    ]
  }
};

const solutions = {
  content: {
    title: 'For',
    content: [
      {
        icon: AiOutlineDisconnect,
        title: 'Agencies',
        description: 'Manage clients projects seamlessly with Techscrum',
        href: '/#',
        hot: false
      },
      {
        icon: AiOutlineTeam,
        title: 'Creative Teams',
        description: 'Manage creative Projects smoothly with Techscrum',
        href: '/#',
        hot: false
      },
      {
        icon: AiOutlineFundProjectionScreen,
        title: 'Startups',
        description:
          'From hitting revenue goals to managing workflows, small businesses thrive with Techscrum.',
        href: '/#',
        hot: false
      },
      {
        icon: AiOutlineDisconnect,
        title: 'Marketing Teams',
        description: 'Manage multiple complex client projects with ease',
        href: '/#',
        hot: false
      },
      {
        icon: AiTwotoneSwitcher,
        title: 'Product Teams',
        description: 'Easily manage and execute on product requirements',
        href: '/#',
        hot: false
      },
      {
        icon: AiOutlineAliwangwang,
        title: 'Remote teams',
        description:
          'Keep your remote team connected and motivated, no matter where they&acute;re located around the world.',
        href: '/#',
        hot: false
      }
    ]
  }
};

export default function ServicesTabs({ show }: Props) {
  const [featuresActive, setFeaturesActive] = useState(false);
  const [solutionActive, setSolutionActive] = useState(false);

  const initial = () => {
    setFeaturesActive(false);
    setSolutionActive(false);
  };

  const activeMenu = (menu: string) => {
    initial();
    if (menu === 'features') setFeaturesActive(!featuresActive);
    if (menu === 'solution') setSolutionActive(!solutionActive);
  };

  return (
    <div className={`${styles.serviceListTabs} ${show ? styles.serviceListTabsActive : ''}`}>
      <div>
        <Link to="/#" onClick={() => activeMenu('features')}>
          Features
          <MdOutlineKeyboardArrowDown />
        </Link>
        <OneColumnsMenu servicesInfo={features} active={featuresActive} />
      </div>
      <div>
        <Link to="/#" onClick={() => activeMenu('solution')}>
          Solutions
          <MdOutlineKeyboardArrowDown />
        </Link>
        <OneColumnsMenu servicesInfo={solutions} active={solutionActive} />
      </div>
      <div>
        <Link to="/about" onClick={() => activeMenu('about')}>
          About
        </Link>
      </div>
      <div>
        <Link to="/contact" onClick={() => activeMenu('contact')}>
          Book a demo
        </Link>
      </div>
    </div>
  );
}
