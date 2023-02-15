import React from 'react';
import BottomButton from '../components/Button/BottomButton/BottomButton';
import PrimaryButton from '../components/Button/PrimaryButton/PrimaryButton';

import SectionWrapper from '../components/Card/SectionWrapper/SectionWrapper';
// import EmailInput from '../components/Form/Input/EmailInput';

// import CheckList from '../components/List/CheckList/CheckList';
// import HorizontalList from '../components/List/HorizontalList/HorizontalList';
import HeroTitle from '../components/Text/HeroTitle/HeroTitle';

// const contentList = [
//   'manage tasks, workflows, & goals',
//   'collaborate in Docs & Whiteboards',
//   'save time with no-code automations'
// ];

// const replaceList = ['asana', 'monday', 'jira'];

function GetStartSection() {
  return (
    <SectionWrapper backgroundColor="purple">
      <HeroTitle mainTitleText="bring your ideas to life with Whiteboards" centerText />
      {/* <CheckList list={contentList} />
      <EmailInput />
      <HorizontalList listTitle="replace" list={replaceList} /> */}
      <PrimaryButton btnTitle="Get Started" />
      <BottomButton btnTitle="Get started" />
    </SectionWrapper>
  );
}

export default GetStartSection;
