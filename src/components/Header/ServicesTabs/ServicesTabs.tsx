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
  AiOutlineAliwangwang,
  AiFillProfile,
  AiOutlineApartment,
  AiOutlineDingding,
  AiFillVideoCamera,
  AiFillRedditCircle,
  AiOutlineRocket,
  AiTwotoneExperiment
} from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import styles from './ServicesTabs.module.scss';
import OneColumnsMenu from './OneColumnMenu/OneColumnMenu';
import TwoColumnsMenu from './TwoColumnsMenu/TwoColumnsMenu';

interface Props {
  show: boolean;
}

const features = {
  Content: {
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
  Content: {
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

const resources = {
  leftContent: {
    title: 'For',
    content: [
      {
        icon: AiFillProfile,
        title: 'Teamwork blog',
        description: 'Browse the latest project management best practices',
        href: '/#',
        hot: true
      },
      {
        icon: AiOutlineApartment,
        title: 'Webinars',
        description: 'Join our experts for live Q&A, tops and best practices',
        href: '/#',
        hot: false
      },
      {
        icon: AiOutlineApartment,
        title: 'Resources Center',
        description: 'Insights, tips, and features to help your team',
        href: '/#',
        hot: false
      },
      {
        icon: AiFillVideoCamera,
        title: 'Videos',
        description: 'Watch our videos on our insights. tops and new features',
        href: '/#',
        hot: false
      },
      {
        icon: AiFillRedditCircle,
        title: 'Support center',
        description: 'Stuck on something with Teamwork? We&apos;re happy to help',
        href: '/#',
        hot: false
      },
      {
        icon: AiOutlineApartment,
        title: 'Partners',
        description: 'Become a Teamwork partner or find one near you',
        href: '/#',
        hot: false
      },
      {
        icon: AiOutlineDingding,
        title: 'Affiliates',
        description: 'Become a Teamwork affiliate today to grow your income',
        href: '/#',
        hot: false
      },
      {
        icon: AiOutlineRocket,
        title: 'Success Center',
        description: 'Set your team-and your clients-up for success',
        href: '/#',
        hot: false
      },
      {
        icon: AiTwotoneExperiment,
        title: 'Guilde',
        description: 'The Teamwork guild to project management',
        href: '/#',
        hot: false
      }
    ],
    btnContent: {
      content: 'view resource center >',
      href: '/#'
    }
  },
  rightContent: {
    title: 'templates',
    content: [
      {
        title: 'Client Onboarding',
        href: '/#',
        hot: false
      },
      {
        title: 'Website Project Plan',
        href: '/#',
        hot: false
      },
      {
        title: 'Marketing Campaign',
        href: '/#',
        hot: false
      },
      {
        title: 'Content Plan',
        href: '/#',
        hot: false
      },
      {
        title: 'Public Relations Plan',
        href: '/#',
        hot: false
      },
      {
        title: 'Event Planning Template',
        href: '/#',
        hot: false
      }
    ],
    btnContent: {
      content: 'see all templates >',
      href: '/#'
    }
  }
};

export default function ServicesTabs({ show }: Props) {
  const [featuresActive, setFeaturesActive] = useState(false);
  const [solutionActive, setSolutionActive] = useState(false);
  const [resourcesActive, setResourcesActive] = useState(false);

  const initial = () => {
    setFeaturesActive(false);
    setSolutionActive(false);
    setResourcesActive(false);
  };

  const activeMenu = (menu: string) => {
    initial();
    if (menu === 'features') setFeaturesActive(!featuresActive);
    if (menu === 'solution') setSolutionActive(!solutionActive);
    if (menu === 'resource') setResourcesActive(!resourcesActive);
  };

  return (
    <div className={`${styles.serviceListTabs} ${show ? styles.serviceListTabsActive : ''}`}>
      <div>
        <a href="/#" onClick={() => activeMenu('features')}>
          Features
          <MdOutlineKeyboardArrowDown />
        </a>
        <OneColumnsMenu servicesInfo={features} active={featuresActive} />
      </div>
      <div>
        <a href="/#" onClick={() => activeMenu('solution')}>
          Solutions
          <MdOutlineKeyboardArrowDown />
        </a>
        <OneColumnsMenu servicesInfo={solutions} active={solutionActive} />
      </div>
      <div>
        <a href="/#" onClick={() => activeMenu('resource')}>
          Resources
          <MdOutlineKeyboardArrowDown />
        </a>
        <TwoColumnsMenu servicesInfo={resources} active={resourcesActive} />
      </div>
    </div>
  );
}
