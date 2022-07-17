import React from 'react';
import { deleteShortcut } from '../../../../api/shortcut/shortcut';
import styles from './EditShortcutFooter.module.scss';

interface IOperation {
  addLinkToggle: boolean;
  setAddLinkToggle: (addLinkToggle: boolean) => void;
  shortCutRemoved: () => void;
  onClickUpdateShortcut: () => void;
  currentProjectId: string;
  shortcutId: string;
}
export default function EditShortcutFooter({
  addLinkToggle,
  setAddLinkToggle,
  shortCutRemoved,
  onClickUpdateShortcut,
  currentProjectId,
  shortcutId
}: IOperation) {
  const removeShortCut = () => {
    deleteShortcut(currentProjectId, shortcutId).then(() => {
      shortCutRemoved();
    });
  };

  return (
    <footer>
      <div className={styles.footerContent}>
        <button className={styles.removeButton} type="button" onClick={removeShortCut}>
          <span>Remove shortcut</span>
        </button>
        <button
          className={styles.cancelButton}
          type="button"
          onClick={() => setAddLinkToggle(!addLinkToggle)}
        >
          <span>Cancel</span>
        </button>
        <button
          className={styles.updateButton}
          type="button"
          onClick={() => {
            setAddLinkToggle(!addLinkToggle);
            onClickUpdateShortcut();
          }}
        >
          <span>Update</span>
        </button>
      </div>
    </footer>
  );
}
