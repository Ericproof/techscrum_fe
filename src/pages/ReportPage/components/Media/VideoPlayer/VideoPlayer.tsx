import React from 'react';
import { capitalise } from '../../../utils';
import styles from './VideoPlayer.module.scss';

interface Props {
  videoSrc: string;
  posterSrc?: string;
  isHaveBackground?: boolean;
  isShowDiamond?: boolean;
  diamondColor?: 'pink' | 'brand' | 'blue' | 'green' | 'yellow' | 'default';
}

function VideoPlayer({
  videoSrc,
  isHaveBackground,

  posterSrc,
  isShowDiamond,
  diamondColor
}: Props) {
  return (
    <div
      className={[
        styles.playerWrapper,
        styles[isHaveBackground ? `playerWrapperWithBg` : ''],
        styles[isShowDiamond ? `playerWrapperWithDiamond` : ''],
        styles[isShowDiamond ? `playerWrapperWithDiamond${capitalise(diamondColor as string)}` : '']
      ].join(' ')}
    >
      <video className={styles.videoPlayer} autoPlay loop muted playsInline poster={posterSrc}>
        <source src={videoSrc} type="video/mp4" />
        <track kind="captions" />
      </video>
    </div>
  );
}

VideoPlayer.defaultProps = {
  isHaveBackground: false,
  posterSrc:
    'https://clickup.com/images/poster-images/videos/features/kanban-board/board-view-agile-inventory.png',
  isShowDiamond: false,
  diamondColor: 'default'
};

export default VideoPlayer;
