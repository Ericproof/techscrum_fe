import React, { useEffect, useState } from 'react';
import AddShortcutFooter from './components/AddShortcutFooter/AddShortcutFooter';
import EditShortcutFooter from './components/EditShortcutFooter/EditShortcutFooter';
import ShortcutBody from './components/ShortcutBody/ShortcutBody';
import styles from './Shortcut.module.scss';

interface IOperation {
  operation: string;
  addLinkToggle: boolean;
  setAddLinkToggle: (addLinkToggle: boolean) => void;
}

export default function Shortcut({ operation, setAddLinkToggle, addLinkToggle }: IOperation) {
  const [webValue, setWebValue] = useState('');
  const [nameValue, setNameValue] = useState('');

  useEffect(() => {}, [webValue, nameValue]);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <header>
          <div className={styles.headerBanner} />
          <div className={styles.addImage}>
            <img
              alt="add_image"
              src="https://jira-frontend-static.prod.public.atl-paas.net/assets/image.46a4b7e1f40adec8b2af7eb2cd452a24.8.svg"
            />
          </div>
        </header>
        <div className={styles.dialog}>
          <ShortcutBody
            operation={operation}
            setWebValue={setWebValue}
            setNameValue={setNameValue}
          />
          {
            {
              Add: (
                <AddShortcutFooter
                  setAddLinkToggle={setAddLinkToggle}
                  addLinkToggle={addLinkToggle}
                  webValue={webValue}
                  nameValue={nameValue}
                />
              ),
              Edit: (
                <EditShortcutFooter
                  setAddLinkToggle={setAddLinkToggle}
                  addLinkToggle={addLinkToggle}
                />
              )
            }[operation]
          }
        </div>
      </div>
    </div>
  );
}
