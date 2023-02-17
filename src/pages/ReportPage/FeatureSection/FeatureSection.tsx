import React from 'react';
import FeatureImgCard from '../components/Card/FeatureImgCard/FeatureImgCard';
import HeroTitle from '../components/Text/HeroTitle/HeroTitle';
import BasicFlex from '../layout/BasicFlex/BasicFlex';
import styles from './FeatureSection.module.scss';

const contentList = [
  'manage tasks, workflows, & goals',
  'collaborate in Docs & Whiteboards',
  'save time with no-code automations'
];

const contentList2 = [
  "Easily see when there's too much work in a status",
  'Measure workload by sprint points, time estimates, and more',
  'Spot bottlenecks at a glance to ship projects faster'
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
      <BasicFlex>
        <FeatureImgCard
          list={contentList}
          cardTitle="stay on track with sorting and filtering"
          imgSrc="https://clickup.com/images/features/kanban-board/board-view-fiter.png"
          cardThemeColor="brand"
        />
        <FeatureImgCard
          list={contentList2}
          cardTitle="monitor capacity with Work in Progress Limits"
          imgSrc="https://clickup.com/images/features/kanban-board/board-view-limits.png"
          cardThemeColor="pink"
        />
      </BasicFlex>
    </div>
  );
}

export default FeatureSection;
