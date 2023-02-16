import React from 'react';
import FeatureImgCard from '../components/Card/FeatureImgCard/FeatureImgCard';
import HeroTitle from '../components/Text/HeroTitle/HeroTitle';
import styles from './FeatureSection.module.scss';

const contentList = [
  'manage tasks, workflows, & goals',
  'collaborate in Docs & Whiteboards',
  'save time with no-code automations'
];

function FeatureSection() {
  return (
    <div className={styles.featureSection}>
      <HeroTitle
        mainTitleText="organize work and assess bandwidth"
        isShowSubTitle
        subTitleText="visualize"
        centerText
        subTitleColor="purple"
        isMainTextShrink
      />
      <FeatureImgCard
        list={contentList}
        cardTitle="stay on track with sorting and filtering"
        imgSrc="https://clickup.com/images/features/kanban-board/board-view-fiter.png"
        cardThemeColor="brand"
      />
    </div>
  );
}

export default FeatureSection;
