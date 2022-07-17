import React from 'react';
import styles from './AddShortcutFooter.module.scss';

interface IProps {
  addLinkToggle: boolean;
  setAddLinkToggle: (addLinkToggle: boolean) => void;
  onClickAddShortcut: (e: React.MouseEvent<HTMLSpanElement>) => void;
  webValue: string;
  nameValue: string;
}
export default function AddShortcutFooter({
  addLinkToggle,
  setAddLinkToggle,
  webValue,
  nameValue,
  onClickAddShortcut
}: IProps) {
  const hasData = webValue && nameValue;

  return (
    <footer>
      <div className={styles.footerContent}>
        <button
          className={styles.cancelButton}
          type="button"
          onClick={() => setAddLinkToggle(!addLinkToggle)}
        >
          <span>Cancel</span>
        </button>

        <button
          className={hasData ? styles.activeAddButton : styles.addButton}
          type="button"
          onClick={onClickAddShortcut}
        >
          <span>Add</span>
        </button>
      </div>
    </footer>
  );
}
