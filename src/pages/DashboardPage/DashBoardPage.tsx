import React, { useMemo } from 'react';
import Loading from '../../components/Loading/Loading';
import ProjectNavigationV3 from '../../lib/ProjectNavigationV3/ProjectNavigationV3';
import ValueCard from './components/ValueCard/ValueCard';
import styles from './DashBoardPage.module.scss';
import useFetchDashboardData from './hooks/useFetchDashboardData';
import { IDashBoardDailyScrum } from '../../types';
import ChartCard, { ChartType } from './components/ChartCard/ChartCard';

interface IValueCard {
  title: string;
  value: number | string;
}

interface ILineChartData {
  data: ReadonlyArray<object>;
  dataKeyList: string[];
}

interface IDashBoardDailyScrumModified
  extends Omit<IDashBoardDailyScrum, 'id' | 'user' | 'progresses'> {
  progresses: {
    timeStamp: string;
    value: number;
  }[];
}

interface IBarChartData {
  dataKeyList: string[];
  data: { name: string; count: number }[];
}

function DashBoardPage() {
  const { data, isLoading } = useFetchDashboardData();

  const valueCardList: IValueCard[] = useMemo(() => {
    if (!data) return [];

    const { taskCount, dailyScrumCount } = data;

    const { total: totalDailyScrum, isCanFinish } = dailyScrumCount;
    const { total: totalTask, toDo, inProgress, done, review } = taskCount;

    const valueCardListData: IValueCard[] = [
      {
        title: 'Total issues',
        value: totalTask
      },
      {
        title: 'issues needs support',
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
        value: `${(
          ((toDo * 0 + inProgress * 0.7 + review * 0.8 + done * 1) / totalTask) *
          100
        ).toFixed(2)}%`
      }
    ];

    return valueCardListData;
  }, [data]);

  const convertProgressData = (input: IDashBoardDailyScrumModified[]): ReadonlyArray<object> => {
    const result: any[] = [];

    // Extract all unique timestamps from the input
    const timestamps: string[] = input.reduce(
      (acc: string[], item: IDashBoardDailyScrumModified) => {
        return acc.concat(
          item.progresses.map(
            (progress: { timeStamp: string; value: number }) => progress.timeStamp
          )
        );
      },
      []
    );

    const uniqueTimestamps = Array.from(new Set(timestamps));

    // Iterate over the timestamps and create a new object for each one
    uniqueTimestamps.forEach((timestamp) => {
      const obj: { name: string } = { name: timestamp };

      // Iterate over the items in the original input and add the progress value for each item to the new object
      input.forEach((item: IDashBoardDailyScrumModified) => {
        const progress = item.progresses.find((p) => p.timeStamp === timestamp);
        obj[item.title] = progress ? progress.value : 0;
      });

      result.push(obj);
    });

    return result;
  };

  // The accpeted data format for LineChart is like this:
  // [
  //   {
  //     "name": "4/2/2023",
  //     "test2": 38,
  //     "test3": 37,
  //     "test4": 32,
  //    ...
  //   },
  //   ...
  // ]
  const lineChartData = useMemo((): ILineChartData => {
    if (!data) return { data: [], dataKeyList: [] };
    return {
      dataKeyList: data?.dailyScrums?.map((dailyScrum) => dailyScrum?.title),
      data: convertProgressData(
        data?.dailyScrums.map(({ title, progresses }) => ({
          title,
          progresses: progresses.map(({ timeStamp, value }) => ({
            timeStamp,
            value
          }))
        }))
      )
    };
  }, [data]);

  // The accpeted data format for BarChart is like this:
  // [
  //   {
  //     "name": "inProgress",
  //     "value": 3,
  //   },
  //   {
  //     "name": "review",
  //     "value": 4,
  //   },
  //   ...
  // ]
  const barChartData = useMemo((): IBarChartData => {
    if (!data) return { data: [], dataKeyList: [] };

    const { taskCount } = data;
    const modifiedData = Object.entries(taskCount).filter(([key]) => key !== 'total');

    return {
      dataKeyList: modifiedData.map(([key]) => key),
      data: modifiedData.map(([key, value]) => ({
        name: key?.toUpperCase(),
        count: value
      }))
    };
  }, [data]);

  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.header}>Dashboard</h1>
      <ProjectNavigationV3 />
      {!isLoading ? (
        <div className={styles.dashboardWrapper}>
          <h2>Sprint number</h2>
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

            <ChartCard
              data={lineChartData?.data}
              dataKeyList={lineChartData?.dataKeyList}
              type={ChartType.LINE_CHART}
              style={{ gridArea: `chart-card-1` }}
            />
            <ChartCard
              data={barChartData?.data}
              type={ChartType.BAR_CHART}
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
