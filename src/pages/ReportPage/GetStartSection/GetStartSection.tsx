import React from 'react';
import EmailInput from '../components/Form/Input/EmailInput';
import VideoPlayer from '../components/Media/VideoPlayer/VideoPlayer';
import HeroTitle from '../components/Text/HeroTitle/HeroTitle';
import Paragraph from '../components/Text/Paragraph/Paragraph';

function GetStartSection() {
  return (
    <div>
      <HeroTitle mainTitleText="create the perfect Agile workflow with Board view" />
      <Paragraph>
        Build a flexible Kanban system to visualize your work and improve project management.
      </Paragraph>
      <EmailInput isShowInputIcon isFullWidth isButtonShrink />
      <VideoPlayer />
    </div>
  );
}

export default GetStartSection;
