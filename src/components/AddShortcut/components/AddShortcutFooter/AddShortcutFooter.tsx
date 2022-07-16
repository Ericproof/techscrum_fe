import React from 'react';
import styles from './AddShortcutFooter.module.scss';

interface IProps {
  addLinkToggle: boolean;
  setAddLinkToggle: (addLinkToggle: boolean) => void;
  webValue: string;
  nameValue: string;
}
export default function AddShortcutFooter({
  addLinkToggle,
  setAddLinkToggle,
  webValue,
  nameValue
}: IProps) {
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

        {webValue.length > 0 && nameValue.length > 0 ? (
          <button className={styles.activeAddButton} type="button">
            <span>Add</span>
          </button>
        ) : (
          <button className={styles.addButton} type="button" disabled>
            <span>Add</span>
          </button>
        )}
      </div>
    </footer>
  );
}
