/* eslint-disable no-secrets/no-secrets */
import React, { useState } from 'react';
import { AiOutlineFolderOpen } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styles from './SubProjectMenu.module.scss';
import InputV2 from '../../../components/FormV2/InputV2/InputV2';

interface ISubProjectMenu {
  toggleSearchMenu: boolean;
  projectList: any;
}

export default function SubProjectMenu(props: ISubProjectMenu) {
  const { toggleSearchMenu, projectList } = props;
  const [filteredResult, setFilteredResult] = useState<any>(null);
  const onChangeFilterProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setFilteredResult(null);
      return;
    }
    const result = projectList.filter((item) => {
      return item.name?.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredResult(result);
  };

  const renderSearchItem = () => {
    return filteredResult?.map((item) => {
      return (
        <Link to={`/projects/${item.id}/board/${item.boardId}`} style={{ textDecoration: 'none' }}>
          <div className={styles.searchItem}>
            <AiOutlineFolderOpen className={styles.icon} />
            <p>{item.name}</p>
          </div>
        </Link>
      );
    });
  };

  return (
    <nav
      className={[styles.container, toggleSearchMenu ? styles.showMenu : styles.hideMenu].join(' ')}
    >
      <h1 className={styles.header}>Search</h1>
      <InputV2
        label="Search"
        data-testId="search"
        onValueChanged={onChangeFilterProject}
        defaultValue=""
        name="search"
      />
      {filteredResult && (
        <h2 className={styles.recentActivityHeader}>Search Result ({filteredResult.length})</h2>
      )}
      {renderSearchItem()}
      {!filteredResult && <h2 className={styles.recentActivityHeader}>My Recent Activity (WIP)</h2>}
    </nav>
  );
}
