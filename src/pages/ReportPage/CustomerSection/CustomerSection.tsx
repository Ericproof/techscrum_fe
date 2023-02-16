import React from 'react';
import SectionWrapper from '../components/Card/SectionWrapper/SectionWrapper';
import EmailInput from '../components/Form/Input/EmailInput';
import HeroTitle from '../components/Text/HeroTitle/HeroTitle';

function CustomerSection() {
  return (
    <SectionWrapper backgroundColor="default">
      <HeroTitle
        mainTitleText="save one day every week with ClickUp's Board view"
        centerText
        isMainTextShrink
      />
      <EmailInput isShowInputIcon isFullWidth />
    </SectionWrapper>
  );
}

export default CustomerSection;
