import React from 'react';
import style from './Description.module.scss';

export default function Description() {
  return (
    <div className={style.container}>
      <h2 className={style.description}>Description</h2>
      <form className={style.form}>
        <textarea
          name="description"
          id="description"
          cols={80}
          rows={23}
          placeholder="Add a description..."
        />
      </form>
      <div className={style.footerContent}>
        <button className={style.saveButton} type="button">
          <span>Save</span>
        </button>
        <button className={style.cancelButton} type="button">
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
}
