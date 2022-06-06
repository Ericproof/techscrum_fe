import React from 'react';
import { IconType } from 'react-icons';
import styles from './TwoColumnsMenu.module.scss';
import Left from './left/Left';
import Right from './right/Right';

interface Props {
  servicesInfo: {
    leftContent: {
      title: string;
      content: Array<{
        icon: IconType;
        title: string;
        description: string;
        href: string;
        hot: boolean;
      }>;
      btnContent: {
        content: string;
        href: string;
      };
    };
    rightContent: {
      title: string;
      content: Array<{
        title: string;
        href: string;
        hot: boolean;
      }>;
      btnContent: {
        content: string;
        href: string;
      };
    };
  };
}

export default function twoCloumnsMenu({ servicesInfo }: Props) {
  return (
    <div className={styles.subNavTwoColumns}>
      <div className={styles.serviceContainerTwoColumns}>
        <Left leftContent={servicesInfo.leftContent} />
        <Right rightContent={servicesInfo.rightContent} />
      </div>
    </div>
  );
}
