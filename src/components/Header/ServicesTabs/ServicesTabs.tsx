import React, { useState } from 'react';
import {
  AiOutlineFieldTime,
  AiFillCopy,
  AiOutlineBarChart,
  AiOutlineLaptop,
  AiOutlineUserAdd,
  AiFillFund,
  AiOutlineDesktop,
  AiOutlineWechat,
  AiFillAliwangwang,
  AiFillMediumCircle,
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
  AiTwotoneExperiment,
  AiOutlineDown
} from 'react-icons/ai';
import styles from './ServicesTabs.module.scss';
import ThreeColumnsMenu from './ThreeColumnsMenu/ThreeColumnsMenu';
import TwoColumnsMenu from './TwoColumnsMenu/TwoColumnsMenu';

interface Props {
  show: boolean;
}

const platform = {
  leftContent: {
    title: 'Overview',
    content: [
      {
        title: 'Product Tour',
        description: 'Designed for your entire team',
        href: '/#'
      },
      { title: 'Integrations', description: 'Connect to your essential tools', href: '/#' },
      { title: 'Customers', description: 'See how teams leverage Teamwork', href: '/#' },
      { title: 'Comparisions', description: 'How Teamwork Compares to the rest', href: '/#' }
    ]
  },
  middleContent: {
    title: 'Features',
    content: [
      {
        icon: AiOutlineFieldTime,
        title: 'Resource Management',
        description: 'Manage your team&apos;s short team and long term resources',
        href: '/#'
      },
      {
        icon: AiFillCopy,
        title: 'Templates',
        description: 'Scale high-performance processes with tempaltes',
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
      },
      {
        icon: AiFillFund,
        title: 'Profitability',
        description: 'Manage your budget and track profitability',
        href: '/#'
      }
    ],
    btnContent: {
      content: 'see all features >',
      href: '/#'
    }
  },
  rightContent: {
    title: 'platform add-one',
    content: [
      {
        icon: AiOutlineDesktop,
        title: 'Desk',
        description: 'Helpdesk software',
        href: '/#'
      },
      {
        icon: AiOutlineWechat,
        title: 'Chat',
        description: 'Video Chat software',
        href: '/#'
      },
      {
        icon: AiFillAliwangwang,
        title: 'CRM',
        description: 'Sales CRM software',
        href: '/#'
      },
      {
        icon: AiFillMediumCircle,
        title: 'Spaces',
        description: 'Document management',
        href: '/#'
      }
    ],
    btnContent: {
      content: 'see all products >',
      href: '/#'
    }
  }
};

const solutions = {
  leftContent: {
    title: 'For',
    content: [
      {
        icon: AiOutlineDisconnect,
        title: 'Agencies',
        description: 'Manage clients projects seamlessly with Teamwork',
        href: '/#',
        hot: false
      },
      {
        icon: AiOutlineTeam,
        title: 'Creative Teams',
        description: 'Manage creative Projects smoothly with Teamwork',
        href: '/#',
        hot: false
      },
      {
        icon: AiOutlineFundProjectionScreen,
        title: 'Professional services',
        description: 'Deliver better outcomes for your clients with Teamwork',
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
        title: 'PMO teams',
        description: 'Everything you need to deliver projects on time and on budget',
        href: '/#',
        hot: false
      }
    ],
    btnContent: {
      content: 'see all teams >',
      href: '/#'
    }
  },
  rightContent: {
    title: 'Use Cases',
    content: [
      {
        title: 'Remote Work',
        href: '/#',
        hot: true
      },
      {
        title: 'Task management',
        href: '/#',
        hot: false
      },
      {
        title: 'Client work',
        href: '/#',
        hot: false
      },
      {
        title: 'Project planning',
        href: '/#',
        hot: false
      },
      {
        title: 'Resource management',
        href: '/#',
        hot: false
      },
      {
        title: 'Project collaboration',
        href: '/#',
        hot: false
      }
    ],
    btnContent: {
      content: 'see all cases >',
      href: '/#'
    }
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
  const [platformActive, setPlatformActive] = useState(false);
  const [solutionActive, setSolutionActive] = useState(false);
  const [resourcesActive, setResourcesActive] = useState(false);

  const initial = () => {
    setPlatformActive(false);
    setSolutionActive(false);
    setResourcesActive(false);
  };

  const activeMenu = (menu: string) => {
    initial();
    if (menu === 'platform') setPlatformActive(!platformActive);
    if (menu === 'solution') setSolutionActive(!solutionActive);
    if (menu === 'resource') setResourcesActive(!resourcesActive);
  };

  return (
    <div className={`${styles.serviceListTabs} ${show ? styles.serviceListTabsActive : ''}`}>
      <div>
        <a href="/#" onClick={() => activeMenu('platform')}>
          Platform
          <AiOutlineDown />
        </a>
        <ThreeColumnsMenu servicesInfo={platform} active={platformActive} />
      </div>
      <div>
        <a href="/#" onClick={() => activeMenu('solution')}>
          Solutions
          <AiOutlineDown />
        </a>
        <TwoColumnsMenu servicesInfo={solutions} active={solutionActive} />
      </div>
      <div>
        <a href="/#">Pricing</a>
      </div>
      <div>
        <a href="/#" onClick={() => activeMenu('resource')}>
          Resources
          <AiOutlineDown />
        </a>
        <TwoColumnsMenu servicesInfo={resources} active={resourcesActive} />
      </div>
    </div>
  );
}
