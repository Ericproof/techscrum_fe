import React from 'react';
import { capitalise } from '../../../utils';
import styles from './HeroTitle.module.scss';

interface Props {
  mainTitleText: string;
  subTitleText?: string;
  isShowSubTitle?: boolean;
  subTitleColor?: 'green' | 'purple' | 'blue' | '';
  centerText?: boolean;
}

function HeroTitle({
  isShowSubTitle,
  mainTitleText,
  subTitleText,
  subTitleColor,
  centerText
}: Props) {
  return (
    <div className={styles.heroTitle}>
      {isShowSubTitle && (
        <div
          className={[
            styles.subText,
            styles[centerText ? 'textCenter' : ''],
            styles[`textColor${capitalise(subTitleColor as string)}`]
          ].join(' ')}
        >
          {subTitleText}
        </div>
      )}
      <h2 className={styles[centerText ? 'textCenter' : '']}>{capitalise(mainTitleText)}.</h2>
    </div>
  );
}

HeroTitle.defaultProps = {
  subTitleText: 'placeholder for subTitle',
  isShowSubTitle: false,
  subTitleColor: '',
  centerText: false
};

export default HeroTitle;
