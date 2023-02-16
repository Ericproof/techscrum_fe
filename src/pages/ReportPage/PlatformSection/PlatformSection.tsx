import React from 'react';
import FeatureImgCard from '../components/Card/FeatureImgCard/FeatureImgCard';

const contentList = [
  "Easily see when there's too much work in a status",
  'Measure workload by sprint points, time estimates, and more',
  'Spot bottlenecks at a glance to ship projects faster'
];

function PlatformSection() {
  return (
    <div>
      <FeatureImgCard
        list={contentList}
        cardTitle="monitor capacity with Work in Progress Limits"
        imgSrc="https://clickup.com/images/features/kanban-board/board-view-limits.png"
        cardThemeColor="pink"
      />
    </div>
  );
}

export default PlatformSection;
