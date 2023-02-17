import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import BoardSection from './BoardSection/BoardSection';
import Space from './components/DecorationWidget/Space/Space';
import EmailInput from './components/Form/Input/EmailInput';
import VideoPlayer from './components/Media/VideoPlayer/VideoPlayer';
import HeroTitle from './components/Text/HeroTitle/HeroTitle';
import Paragraph from './components/Text/Paragraph/Paragraph';
import CustomerSection from './CustomerSection/CustomerSection';
import FeatureSection from './FeatureSection/FeatureSection';
import useWindowSize from './hooks/useWindowSize';
import BasicFlex from './layout/BasicFlex/BasicFlex';
import styles from './ReportPage.module.scss';

const BREAKPOINTS = {
  '1200': 1200,
  '1000': 1000,
  '768': 768,
  '600': 600
};

function ReportPage() {
  const { width } = useWindowSize(); // this hooks will only be accepted in layout level component

  const isDeskTop = width > BREAKPOINTS[768];
  const isMobile = width < BREAKPOINTS[600];

  return (
    <>
      <Header />
      <div className={styles.mainWrapper}>
        <BasicFlex gap="large">
          <div>
            <HeroTitle mainTitleText="create the perfect Agile workflow with Board view" />
            <Paragraph>
              Build a flexible Kanban system to visualize your work and improve project management.
            </Paragraph>
            <Space />
            <EmailInput isShowInputIcon isFullWidth isButtonShrink />
            <Space power={2} />
          </div>
          <div>
            <Space power={2} />
            {!isDeskTop && <Space power={isMobile ? 1 : 2} />}
            <VideoPlayer videoSrc="https://clickup.com/videos/features/kanban-board/board-view-agile-inventory.mp4" />
          </div>
        </BasicFlex>

        <BoardSection />

        <BasicFlex flexGrowRatio="toRight" gap="medium">
          <VideoPlayer
            videoSrc="https://clickup.com/videos/features/kanban-board/board-view-grouping.mp4"
            isHaveBackground
            isShowDiamond={isDeskTop}
            diamondColor="pink"
            diamondPosition="right"
          />
          <div>
            <HeroTitle
              isMainTextShrink
              mainTitleText="see all your Boards in one view"
              isShowSubTitle
              subTitleText="everything view"
              subTitleColor="pink"
              isShowUnderline
              underlineColor="pink"
              centerText={!isDeskTop}
            />

            <Space power={3} />
            <Paragraph centerText={!isDeskTop}>
              Arrange your columns to analyze projects from any angle. Group by status, assignee,
              priority, and more.
            </Paragraph>
          </div>
        </BasicFlex>

        <FeatureSection />
        <CustomerSection />
      </div>

      <Footer />
    </>
  );
}

export default ReportPage;
