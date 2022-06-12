import React from 'react';
import style from './navTop.module.scss';

export default function NavTop() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <img
          src="https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10411?size=xxlarge"
          alt="img"
        />
        <div className={style.textContext}>
          <h2>TECHSCRUM</h2>
          <span>Software project</span>
        </div>
      </div>
    </div>
  );
}
