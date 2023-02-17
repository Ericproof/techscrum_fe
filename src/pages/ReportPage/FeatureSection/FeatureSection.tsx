import React from 'react';
import FeatureImgCard from '../components/Card/FeatureImgCard/FeatureImgCard';
import Space from '../components/DecorationWidget/Space/Space';
import HeroTitle from '../components/Text/HeroTitle/HeroTitle';
import useWindowSize from '../hooks/useWindowSize';
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

const BREAKPOINTS = {
  '1200': 1200,
  '1000': 1000,
  '768': 768,
  '600': 600
};

function FeatureSection() {
  const { width } = useWindowSize();

  const isDeskTop = width > BREAKPOINTS[768];

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
      <Space power={3} />
      <BasicFlex gap="large">
        <FeatureImgCard
          list={contentList}
          cardTitle="stay on track with sorting and filtering"
          imgSrc="https://clickup.com/images/features/kanban-board/board-view-fiter.png"
          cardThemeColor="brand"
        />
        {!isDeskTop && <Space power={6} />}
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
