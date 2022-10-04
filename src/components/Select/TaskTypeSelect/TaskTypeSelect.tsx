import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './TaskTypeSelect.module.scss';

const TYPES = [
  {
    title: 'story',
    imgUrl:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium'
  },
  {
    title: 'task',
    imgUrl:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium'
  },
  {
    title: 'bug',
    imgUrl:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium'
  }
];

interface IOption {
  title: string;
  imgUrl: string;
  onClick?: (e: any) => void;
}

function Option({ title, imgUrl, onClick }: IOption) {
  return (
    <button className={styles.buttonContainer} onClick={onClick} name={title} value={title}>
      <img className={styles.icon} src={imgUrl} alt={title} />
      {title}
    </button>
  );
}

interface ITaskTypeSelect {
  onChange?: (e: any) => void;
}

export default function TaskTypeSelect({ onChange }: ITaskTypeSelect) {
  const initialOption = TYPES[0];
  const [showOptions, setShowOptions] = useState(false);
  const [currentOption, setCurrentOption] = useState(initialOption);
  const otherOptions = TYPES.filter((item) => item.title !== currentOption.title);

  const handleCurrentOption = useCallback((title) => {
    const newCurrentOption = TYPES.filter((item) => item.title === title)[0];
    setCurrentOption(newCurrentOption);
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
      <Option onClick={onClickOption} title={currentOption.title} imgUrl={currentOption.imgUrl} />
      <div className={styles.optionsContainer}>
        <ul className={[styles.listContainer, showOptions && styles.show].join(' ')}>
          {otherOptions.map((option) => {
            const { title, imgUrl } = option;
            return (
              <li key={title}>
                <Option onClick={onClickOption} title={title} imgUrl={imgUrl} />
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
