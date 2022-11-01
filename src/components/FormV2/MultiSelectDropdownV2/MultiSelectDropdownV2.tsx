/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';
import { getErrorMessage } from '../../../utils/formUtils';
import styles from '../FormV2.module.scss';
import defaultStyles from './MultiSelectDropdownV2.module.scss';

interface IMultiSelectDropdownV2 {
  onValueChanged: (e: any) => void;
  onValueBlur: (e: any) => void;
  name: string;
  options: any;
  label: string;
  required?: boolean;
  placeHolder?: string;
}

export default function MultiSelectDropdownV2(props: IMultiSelectDropdownV2) {
  const { name, label, placeHolder, required, options, onValueChanged, onValueBlur } = props;
  const [searchValue, setSearchValue] = useState(null);
  const [error, setError] = useState<null | string>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [isActive, setIsActive] = useState(false);

  const onChangeSelect = (item) => {
    const e = { target: { value: item.value, label: item.label } };
    const errorMessage = getErrorMessage(e, props);
    setError(errorMessage);

    const updateSelectedItems = [...selectedItems, item];
    setSelectedItems(updateSelectedItems);
    onValueChanged(e);
    setShowMenu(false);
    setIsActive(false);
    setSearchValue(null);
  };

  const onChangeSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const removeItem = (itemRemove: any) => {
    setSelectedItems(selectedItems.filter((item) => item.value !== itemRemove.value));
  };

  const onBlurValue = (e: any) => {
    onValueBlur(e);
  };

  const getFilteredOptions = () => {
    const objectKey = {};
    selectedItems.forEach((element) => {
      objectKey[element.value] = true;
    });

    return options
      .filter((item) => {
        return searchValue ? item.label.includes(searchValue) : true;
      })
      .filter((item) => {
        return !objectKey[item.value];
      });
  };

  const filteredOptions = getFilteredOptions();
  const showInput = isActive || selectedItems.length === 0;
  const inputClasses = [
    defaultStyles.defaultSearchInput,
    styles.input,
    error ? styles.borderRed : '',
    !searchValue ? styles.lightGrey : ''
  ].join(' ');
  const labelClasses = [
    styles.label,
    isActive ? styles.active : '',
    error ? styles.errorRed : ''
  ].join(' ');
  const inputContainerClasses = [
    'relative',
    isActive ? styles.borderActive : '',
    styles.inputContainer
  ].join(' ');

  const renderDropDown = () => {
    const isInOptionsList =
      options.filter((item) => {
        return item.label === searchValue;
      }).length > 0;

    return (
      <div className={defaultStyles.dropDownList}>
        {filteredOptions.map((item) => {
          return <button onClick={() => onChangeSelect(item)}>{item.label}</button>;
        })}
        {searchValue && !isInOptionsList && (
          <>
            {filteredOptions.length > 0 && <hr className={defaultStyles.newLabelLine} />}
            <button>{`${searchValue} (New Label)`}</button>
          </>
        )}
      </div>
    );
  };

  return (
    <div
      className="relative"
      onClick={() => {
        setIsActive(true);
      }}
    >
      <div className={inputContainerClasses}>
        <label className={labelClasses} htmlFor={name}>
          {label}
          {required ? <span className={styles.errorRed}>*</span> : ''}
        </label>
        {selectedItems.length > 0 && (
          <div className={[defaultStyles.selectedItemsList].join(' ')}>
            {selectedItems.map((item) => {
              return (
                <div className={defaultStyles.selectedItems}>
                  <p>{item.label}</p>
                  <TiDelete
                    className={defaultStyles.deleteIcon}
                    onClick={() => {
                      removeItem(item);
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
        {showInput && (
          <input
            type="text"
            className={inputClasses}
            onClick={() => {
              setShowMenu(true);
            }}
            onFocus={() => {
              setIsActive(true);
            }}
            onChange={onChangeSearch}
            onBlur={onBlurValue}
            value={searchValue || ''}
            placeholder={placeHolder}
          />
        )}

        <RiArrowDropDownLine className={styles.dropDown} />
      </div>
      <div className="relative">
        {showMenu && (filteredOptions.length > 0 || searchValue) && renderDropDown()}
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

MultiSelectDropdownV2.defaultProps = {
  required: false,
  placeHolder: ''
};
