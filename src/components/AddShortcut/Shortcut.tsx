import React, { useEffect, useState } from 'react';
import { createShortcut, updateShortcut } from '../../api/shortcut/shortcut';
import { IShortcutData } from '../../types';
import AddShortcutFooter from './components/AddShortcutFooter/AddShortcutFooter';
import EditShortcutFooter from './components/EditShortcutFooter/EditShortcutFooter';
import ShortcutBody from './components/ShortcutBody/ShortcutBody';
import styles from './Shortcut.module.scss';

interface IOperation {
  operation: string;
  addLinkToggle: boolean;
  setAddLinkToggle: (addLinkToggle: boolean) => void;
  shortCutAdded: (data: IShortcutData) => void;
  shortCutRemoved: () => void;
  shortCutUpdated: () => void;
  selectedLink: IShortcutData | null;
  currentProjectId: string;
}

export default function Shortcut({
  operation,
  setAddLinkToggle,
  addLinkToggle,
  selectedLink,
  currentProjectId,
  shortCutAdded,
  shortCutRemoved,
  shortCutUpdated
}: IOperation) {
  const [webValue, setWebValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [isUrlValid, setIsUrlValid] = useState(true);

  function validURL(str: string) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  }

  useEffect(() => {
    setIsUrlValid(!validURL(webValue));
  }, [webValue]);

  useEffect(() => {
    setWebValue(selectedLink?.shortcutLink);
    setNameValue(selectedLink?.name);
  }, [selectedLink]);

  useEffect(() => {}, [webValue, nameValue]);

  const onClickAddShortcut = () => {
    createShortcut(currentProjectId, { shortcutName: nameValue, webAddress: webValue }).then(
      (res) => {
        shortCutAdded(res.data);
      }
    );
  };

  const onClickUpdateShortcut = () => {
    updateShortcut(currentProjectId, selectedLink?.id, {
      shortcutName: nameValue,
      webAddress: webValue
    }).then(() => {
      shortCutUpdated();
    });
  };

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
            webValue={webValue}
            value={nameValue}
            isUrlValid={isUrlValid}
          />
          {
            {
              Add: (
                <AddShortcutFooter
                  setAddLinkToggle={setAddLinkToggle}
                  addLinkToggle={addLinkToggle}
                  webValue={webValue}
                  nameValue={nameValue}
                  onClickAddShortcut={onClickAddShortcut}
                  isUrlValid={isUrlValid}
                />
              ),
              Edit: (
                <EditShortcutFooter
                  setAddLinkToggle={setAddLinkToggle}
                  addLinkToggle={addLinkToggle}
                  shortCutRemoved={shortCutRemoved}
                  currentProjectId={currentProjectId}
                  shortcutId={selectedLink?.id}
                  onClickUpdateShortcut={onClickUpdateShortcut}
                />
              )
            }[operation]
          }
        </div>
      </div>
    </div>
  );
}
