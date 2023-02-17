import React from 'react';
import Space from '../components/DecorationWidget/Space/Space';
import VideoPlayer from '../components/Media/VideoPlayer/VideoPlayer';
import HeroTitle from '../components/Text/HeroTitle/HeroTitle';
import Paragraph from '../components/Text/Paragraph/Paragraph';
import useWindowSize from '../hooks/useWindowSize';
import BasicFlex from '../layout/BasicFlex/BasicFlex';

function BoardSection() {
  const { width } = useWindowSize();

  return (
    <BasicFlex flexGrowRatio="toLeft" gap="medium">
      <div>
        <HeroTitle
          mainTitleText="group your Boards your way"
          isShowSubTitle
          subTitleText="flexible grouping"
          isShowUnderline
          subTitleColor="purple"
          underlineColor="purple"
          isMainTextShrink
          centerText={!(width > 768)}
        />

        <Space power={3} />
        <Paragraph centerText={!(width > 768)}>
          Arrange your columns to analyze projects from any angle. Group by status, assignee,
          priority, and more.
        </Paragraph>
      </div>
      <VideoPlayer
        videoSrc="https://clickup.com/videos/features/kanban-board/board-view-grouping.mp4"
        isHaveBackground
        isShowDiamond={width > 768}
        diamondColor="default"
      />
    </BasicFlex>
  );
}

export default BoardSection;
