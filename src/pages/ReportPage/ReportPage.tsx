import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Space from './components/DecorationWidget/Space/Space';
import EmailInput from './components/Form/Input/EmailInput';
import VideoPlayer from './components/Media/VideoPlayer/VideoPlayer';
import HeroTitle from './components/Text/HeroTitle/HeroTitle';
import Paragraph from './components/Text/Paragraph/Paragraph';
import useWindowSize from './hooks/useWindowSize';
import BasicFlex from './layout/BasicFlex/BasicFlex';
import styles from './ReportPage.module.scss';
import { BREAKPOINTS } from './utils';
import {
  GET_START_SECTION_DATA,
  BOARD_SECTION_DATA_LIST,
  FEATURE_SECTION_DATA
} from './pageTextContent';
import FeatureImgCard from './components/Card/FeatureImgCard/FeatureImgCard';
import SectionWrapper from './components/Card/SectionWrapper/SectionWrapper';

function ReportPage() {
  const { width } = useWindowSize(); // this hooks will only be accepted in layout level component

  const isDeskTop = width > BREAKPOINTS[768];
  const isMobile = width < BREAKPOINTS[600];
  const isDeskTopPlus = width > BREAKPOINTS[1000];

  return (
    <>
      <Header />
      <div className={styles.mainWrapper}>
        <BasicFlex gap="large">
          <div>
            <HeroTitle mainTitleText="create the perfect Agile workflow with Board view" />
            <Paragraph>{GET_START_SECTION_DATA.GET_START_SECTION_DESCRIPTION_TEXT}</Paragraph>
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

        {BOARD_SECTION_DATA_LIST.map(
          ({ MAIN_TITLE_TEXT, SUB_TITLE_TEXT, THEME_COLOR, VIDEO_URL, DESCRIPTION }, index) => (
            <BasicFlex
              flexGrowRatio="moreOnLeft"
              gap="large"
              key={MAIN_TITLE_TEXT + SUB_TITLE_TEXT}
              isFlexReverse={!!(index % 2)}
            >
              <div>
                <HeroTitle
                  mainTitleText={MAIN_TITLE_TEXT}
                  isShowSubTitle
                  subTitleText={SUB_TITLE_TEXT}
                  isShowUnderline
                  subTitleColor={
                    THEME_COLOR as '' | 'purple' | 'pink' | 'blue' | 'green' | 'yellow' | undefined
                  }
                  underlineColor={
                    THEME_COLOR as '' | 'purple' | 'pink' | 'blue' | 'green' | 'yellow' | undefined
                  }
                  isMainTextShrink
                  centerText={!(width > 768)}
                />

                <Space power={3} />
                <Paragraph centerText={!(width > 768)}>{DESCRIPTION}</Paragraph>
              </div>
              <VideoPlayer
                videoSrc={VIDEO_URL}
                isHaveBackground
                isShowDiamond={width > 768}
                diamondColor={
                  THEME_COLOR as
                    | 'default'
                    | 'purple'
                    | 'pink'
                    | 'blue'
                    | 'green'
                    | 'yellow'
                    | undefined
                }
                diamondPosition={index % 2 ? 'right' : 'left'}
              />
            </BasicFlex>
          )
        )}
        <div>
          <HeroTitle
            mainTitleText={FEATURE_SECTION_DATA.SECTION_TITLE_MAIN_TEXT}
            isShowSubTitle
            subTitleText={FEATURE_SECTION_DATA.SECTION_TITLE_SUB_TEXT}
            centerText
            subTitleColor={
              FEATURE_SECTION_DATA.SECTION_TITLE_SUB_COLOR as
                | ''
                | 'purple'
                | 'pink'
                | 'blue'
                | 'green'
                | 'yellow'
                | undefined
            }
            isMainTextShrink
          />
          <Space power={3} />

          <BasicFlex gap="large">
            {FEATURE_SECTION_DATA.SECTION_CARDS.map(
              ({ CARD_CONTENT_LIST, CARD_TITLE_TEXT, CARD_IMG_SRC, CARD_THEME_COLOR }) => (
                <FeatureImgCard
                  key={CARD_TITLE_TEXT + CARD_IMG_SRC}
                  list={CARD_CONTENT_LIST}
                  cardTitle={CARD_TITLE_TEXT}
                  imgSrc={CARD_IMG_SRC}
                  cardThemeColor={
                    CARD_THEME_COLOR as
                      | ''
                      | 'pink'
                      | 'blue'
                      | 'green'
                      | 'brand'
                      | 'default'
                      | undefined
                  }
                />
              )
            )}
          </BasicFlex>
        </div>

        <SectionWrapper backgroundColor="default">
          <BasicFlex gap={isDeskTopPlus ? 'large' : 'small'}>
            <HeroTitle
              mainTitleText="save one day every week with ClickUp's Board view"
              centerText={!isDeskTop}
              isMainTextShrink
            />
            <div
              style={{
                position: 'absolute',
                insetBlock: '-20px',
                right: '-20px',
                background: `url(
                  'https://clickup.com/images/collaboration-detection/bg__with-dotted.svg'
                ) repeat top right/cover`,
                width: isDeskTop ? '50%' : '100%'
              }}
            />
            <EmailInput
              isShowInputIcon
              isFullWidth
              isInputAndBtnOnSameRow={!isMobile}
              isButtonShrink={!isMobile}
            />
          </BasicFlex>
        </SectionWrapper>
      </div>

      <Footer />
    </>
  );
}

export default ReportPage;
