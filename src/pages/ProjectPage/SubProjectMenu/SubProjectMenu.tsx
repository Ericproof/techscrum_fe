/* eslint-disable no-secrets/no-secrets */
import React from 'react';
import styles from './SubProjectMenu.module.scss';
import InputV2 from '../../../components/FormV2/InputV2/InputV2';

interface ISubProjectMenu {
  toggleSearchMenu: boolean;
}

export default function SubProjectMenu(props: ISubProjectMenu) {
  const { toggleSearchMenu } = props;

  // const onChangeFilterProject = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.value) {
  //     setFilteredProjectList(projectList);
  //     return;
  //   }
  //   setFilteredProjectList(
  //     projectList.filter((item) => {
  //       return item.name?.toLowerCase().includes(e.target.value.toLowerCase());
  //     })
  //   );
  // };

  return (
    <nav
      className={[styles.container, toggleSearchMenu ? styles.showMenu : styles.hideMenu].join(' ')}
    >
      <h1 className={styles.header}>Search</h1>
      <InputV2
        label="Search"
        data-testId="search"
        onValueChanged={() => {}}
        defaultValue=""
        name="search"
      />
      <h2 className={styles.recentActivityHeader}>My Recent Activity</h2>
    </nav>
  );
}
