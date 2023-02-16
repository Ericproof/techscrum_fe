import React from 'react';
import styles from './VideoPlayer.module.scss';

function VideoPlayer() {
  return (
    <div className={styles.playerWrapper}>
      <video
        className={styles.videoPlayer}
        autoPlay
        loop
        muted
        playsInline
        poster="https://clickup.com/images/poster-images/videos/features/kanban-board/board-view-agile-inventory.png"
      >
        <source
          src="https://clickup.com/videos/features/kanban-board/board-view-agile-inventory.mp4"
          type="video/mp4"
        />
        <track kind="captions" />
      </video>
    </div>
  );
}

export default VideoPlayer;
