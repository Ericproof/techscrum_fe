import React from 'react';
import styles from './AddShortcutFooter.module.scss';

interface IProps {
  addLinkToggle: boolean;
  setAddLinkToggle: (addLinkToggle: boolean) => void;
  onClickAddShortcut: (e: React.MouseEvent<HTMLSpanElement>) => void;
  webValue: string;
  nameValue: string;
  isUrlValid: boolean;
}
export default function AddShortcutFooter({
  addLinkToggle,
  setAddLinkToggle,
  webValue,
  nameValue,
  onClickAddShortcut,
  isUrlValid
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
          className={hasData && !isUrlValid ? styles.activeAddButton : styles.addButton}
          type="button"
          onClick={onClickAddShortcut}
          disabled={isUrlValid || !hasData}
        >
          <span>Add</span>
        </button>
      </div>
    </footer>
  );
}
