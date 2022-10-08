import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './TaskTypeSelect.module.scss';

const TYPES = [
  {
    type: 'story',
    imgUrl:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium'
  },
  {
    type: 'task',
    imgUrl:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium'
  },
  {
    type: 'bug',
    imgUrl:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium'
  }
];

interface IOption {
  type: string;
  imgUrl: string;
  onClick?: (e: any) => void;
}

function Option({ type, imgUrl, onClick }: IOption) {
  return (
    <button className={styles.buttonContainer} onClick={onClick} name={type} value={type}>
      <img className={styles.icon} src={imgUrl} alt={type} />
      {type}
    </button>
  );
}

interface ITaskTypeSelect {
  onChange?: (e: any) => void;
  onChangeType: (obj: { type: string; imgUrl: string }) => void;
}

export default function TaskTypeSelect({ onChange, onChangeType }: ITaskTypeSelect) {
  const initialOption = TYPES[0];
  const [showOptions, setShowOptions] = useState(false);
  const [currentOption, setCurrentOption] = useState(initialOption);
  const otherOptions = TYPES.filter((item) => item.type !== currentOption.type);

  const handleCurrentOption = useCallback((type) => {
    const newCurrentOption = TYPES.filter((item) => item.type === type)[0];
    setCurrentOption(newCurrentOption);
    onChangeType(newCurrentOption);
  }, []);

  const onClickOption = (e: any) => {
    e.preventDefault();
    setShowOptions(!showOptions);
    if (onChange) onChange(e.target.value);
    handleCurrentOption(e.target.name);
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!containerRef.current?.contains(e.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <Option onClick={onClickOption} type={currentOption.type} imgUrl={currentOption.imgUrl} />
      <div className={styles.optionsContainer}>
        <ul className={[styles.listContainer, showOptions && styles.show].join(' ')}>
          {otherOptions.map((option) => {
            const { type, imgUrl } = option;
            return (
              <li key={type}>
                <Option onClick={onClickOption} type={type} imgUrl={imgUrl} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

Option.defaultProps = {
  onClick: null
};

TaskTypeSelect.defaultProps = {
  onChange: null
};
