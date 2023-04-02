import React, { useMemo } from 'react';
import Loading from '../../components/Loading/Loading';
import ProjectNavigationV3 from '../../lib/ProjectNavigationV3/ProjectNavigationV3';
import ValueCard from './components/ValueCard/ValueCard';
import styles from './DashBoardPage.module.scss';
import useFetchDashboardData from './hooks/useFetchDashboardData';
import { IDashboard } from '../../types';
import LineChartCard, { ChartType } from './components/ChartCard/LineChartCard';

interface IValueCard {
  title: string;
  value: number;
}

function DashBoardPage() {
  const { data, isLoading } = useFetchDashboardData();

  const valueCardList: IValueCard[] = useMemo(() => {
    if (!data) return [];

    const { taskCount, dailyScrumCount } = data as IDashboard;

    const { total: totalDailyScrum, isCanFinish } = dailyScrumCount;
    const { total: totalTask, toDo, inProgress, done, review } = taskCount;

    const valueCardListData: IValueCard[] = [
      {
        title: 'Total number of issues',
        value: totalTask
      },
      {
        title: 'Number of issues that need support',
        value: dailyScrumCount?.isNeedSupport?.total
      },
      {
        title: 'Delayed issues',
        value: totalDailyScrum - isCanFinish
      },
      {
        title: 'Current progress',
        // To do stands for 0%, in progress stands for 70%, preview stands for 80%, done stands for 100%
        // avoid using toFixed() to keep the type of number
        value:
          Math.round(((toDo * 0 + inProgress * 0.7 + review * 0.8 + done * 1) / totalTask) * 1e2) /
          1e2
      },
      {
        title: 'Number of finished issues',
        value: taskCount?.done
      },
      {
        title: 'Number of issues that can fisnish',
        value: isCanFinish
      }
    ];

    return valueCardListData;
  }, [data]);

  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.header}>Dashboard</h1>
      <ProjectNavigationV3 />
      {!isLoading ? (
        <div className={styles.dashboardWrapper}>
          <h2>Spring number</h2>
          <div className={styles.dashboardGridLayout}>
            {valueCardList.map(({ title, value }, index) => {
              return (
                <ValueCard
                  key={crypto.randomUUID()}
                  style={{ gridArea: `value-card-${index + 1}` }}
                  title={title}
                  value={value}
                />
              );
            })}

            <LineChartCard
              data={data?.dailyScrums}
              type={ChartType.LINE_CHART}
              style={{ gridArea: `chart-card-1` }}
            />
            <LineChartCard
              data={data?.dailyScrums}
              type={ChartType.LINE_CHART}
              style={{ gridArea: `chart-card-2` }}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default DashBoardPage;
