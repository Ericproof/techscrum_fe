import React from 'react';
import Loading from '../../components/Loading/Loading';
import ProjectNavigationV3 from '../../lib/ProjectNavigationV3/ProjectNavigationV3';
import ValueCard from './components/ValueCard/ValueCard';

import styles from './DashBoardPage.module.scss';
import useFetchDashboardData from './hooks/useFetchDashboardData';

function DashBoardPage() {
  const { isLoading } = useFetchDashboardData();

  // const valueCardData = useMemo(() => {
  //   const { taskCount, dailyScrumCount } = data;
  // }, [data]);

  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.header}>Dashboard</h1>
      <ProjectNavigationV3 />
      {!isLoading ? (
        <div className={styles.dashboardWrapper}>
          <h2>Spring number</h2>
          <div className={styles.dashboardGridLayout}>
            {new Array(6).fill(0).map((_, index) => {
              return (
                <ValueCard
                  key={crypto.randomUUID()}
                  style={{ gridArea: `value-card-${index + 1}` }}
                  title="value card title"
                  value="value card value"
                />
              );
            })}

            {new Array(2).fill(0).map((_, index) => {
              return (
                <div
                  key={crypto.randomUUID()}
                  style={{ gridArea: `chart-card-${index + 1}` }}
                  className={styles.card}
                >
                  chart card
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default DashBoardPage;
