import React from 'react';
import styles from './ShortcutBody.module.scss';

interface IShortCutBody {
  operation: string;
  setWebValue: (value: string) => void;
  setNameValue: (value: string) => void;
  webValue: string;
  value: string;
  isUrlValid: boolean;
}

export default function ShortcutBody({
  operation,
  setWebValue,
  setNameValue,
  value,
  webValue,
  isUrlValid
}: IShortCutBody) {
  return (
    <>
      <h1>{operation} shortcut</h1>
      <div className={styles.inputContent}>
        <p>
          Web address<span>*</span>
        </p>
        <input
          type="text"
          name="input"
          className={styles.inputRight}
          placeholder="e.g. http://www.atlassian.com"
          onChange={(event) => {
            setWebValue(event.target.value);
          }}
          value={webValue}
        />
        {isUrlValid && <p className={styles.colorRed}>Invalid URL</p>}
      </div>
      <br />
      <div className={styles.inputContent}>
        <p>
          Name<span>*</span>
        </p>
        <input
          type="text"
          name="input"
          className={styles.inputRight}
          placeholder="e.g. Atlassian website"
          onChange={(event) => {
            setNameValue(event.target.value);
          }}
          value={value}
        />
      </div>
      <div className={styles.proTip}>
        <span>
          <strong> 😎Pro tip:</strong> Start your shortcut’s name with an emoji to customize its
          icon.
        </span>
      </div>
    </>
  );
}
