import React from 'react';
import styles from './EditShortcutFooter.module.scss';

interface IOperation {
  addLinkToggle: boolean;
  setAddLinkToggle: (addLinkToggle: boolean) => void;
}
export default function EditShortcutFooter({ addLinkToggle, setAddLinkToggle }: IOperation) {
  return (
    <footer>
      <div className={styles.footerContent}>
        <button className={styles.removeButton} type="button">
          <span>Remove shortcut</span>
        </button>
        <button
          className={styles.cancelButton}
          type="button"
          onClick={() => setAddLinkToggle(!addLinkToggle)}
        >
          <span>Cancel</span>
        </button>
        <button className={styles.updateButton} type="button" disabled>
          <span>Update</span>
        </button>
      </div>
    </footer>
  );
}
