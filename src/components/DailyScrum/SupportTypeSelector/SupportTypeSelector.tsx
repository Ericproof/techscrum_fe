import React, { useEffect } from 'react';
import styles from './SupportTypeSelector.module.scss';

const supportTypesTitles: string[] = [
  'no support',
  'technical support',
  'requirement support',
  'dependency support',
  'other'
];

function SupportTypeSelector({
  supportType,
  name,
  onChange,
  otherSupportDesc,
  editOtherSupportDesc
}: {
  supportType: 0 | 1 | 2 | 3 | 4;
  onChange: (value: number) => void;
  name: string;
  otherSupportDesc?: string;
  editOtherSupportDesc: (value: string) => void;
}) {
  useEffect(() => {
    if (supportType !== 4) {
      editOtherSupportDesc('');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supportType]);

  return (
    <div className={styles.mainWrapper}>
      {supportTypesTitles.slice(1).map((title, index) => {
        return (
          <div className="controlWrapper" key={crypto.randomUUID()}>
            <label htmlFor={`${name}-${index}`} className="supportName">
              {title}
              <input
                type="radio"
                id={`${name}-${index}`}
                name={name}
                checked={index === supportType - 1}
                value={index + 1}
                onChange={(e) => {
                  onChange(+e.target.value);
                }}
              />
            </label>
          </div>
        );
      })}
      {supportType === 4 ? (
        <textarea
          placeholder="please write at least one reason."
          maxLength={40}
          value={otherSupportDesc}
          onChange={(e) => {
            editOtherSupportDesc(e.target.value);
          }}
        />
      ) : null}
    </div>
  );
}

SupportTypeSelector.defaultProps = {
  otherSupportDesc: ''
};

export default SupportTypeSelector;
