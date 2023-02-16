import React from 'react';
import Space from '../components/DecorationWidget/Space/Space';
import VideoPlayer from '../components/Media/VideoPlayer/VideoPlayer';
import HeroTitle from '../components/Text/HeroTitle/HeroTitle';
import Paragraph from '../components/Text/Paragraph/Paragraph';

function BoardSection() {
  return (
    <div>
      <HeroTitle
        mainTitleText="see all your Boards in one view"
        isShowSubTitle
        subTitleText="everything view"
        isShowUnderline
        subTitleColor="blue"
        centerText
        underlineColor="blue"
        isMainTextShrink
      />
      <Space power={3} />
      <Paragraph centerText>
        Get an overview of where all your team projects stand at a glance with Everything view. See
        multiple workflows in one view, even if they have different statuses.
      </Paragraph>
      <VideoPlayer />
    </div>
  );
}

export default BoardSection;
