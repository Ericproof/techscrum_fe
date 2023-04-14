import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  Legend,
  BarChart,
  Line,
  LineChart
} from 'recharts';
import { IUserInfo } from '../../../../types';
import styles from './ChartCard.module.scss';
import { UserContext } from '../../../../context/UserInfoProvider';
import { useFetchDashboardDailyScrumsByUser } from '../../hooks/useFetchDashboardData';
import { getUsers } from '../../../../api/user/user';
import { convertProgressData } from '../../utils';

type Props = {
  data?: any;
  dataKeyList?: string[];
  type: ChartType;
  style?: React.CSSProperties;
};

export enum ChartType {
  BAR_CHART = 'barChart',
  LINE_CHART = 'lineChart'
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

function lineChart(data: any, dataKeyList: string[] = []) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {dataKeyList.map((dataKey) => {
          return (
            <Line
              type="monotone"
              key={crypto.randomUUID()}
              dataKey={dataKey}
              stroke={getRandomHexColor()}
              activeDot={{ r: 8 }}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}
function barChart(data: any) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
        barSize={35}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar key={crypto.randomUUID()} dataKey="count" fill="#6a2add" />;
      </BarChart>
    </ResponsiveContainer>
  );
}

function ChartCard({ style, dataKeyList, data, type }: Props) {
  const { id: initialId } = useContext(UserContext);
  const [chartData, setChartData] = useState(data);
  const [chartDataKeyList, setDataKeyList] = useState(dataKeyList || []);
  const [currentUserId, setCurrentUserId] = useState(initialId);
  const [users, setUsers] = useState<IUserInfo[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getUsers();
      setUsers(res.data);
    })();
  }, []);

  const rawData = useFetchDashboardDailyScrumsByUser(currentUserId as string);

  const newData = useMemo(() => {
    if (!rawData) {
      return null;
    }
    return {
      dataKeyList: rawData?.map(({ title }) => title),
      data: convertProgressData(
        rawData?.map(({ title, progresses }) => ({
          title,
          progresses: progresses?.map(({ timeStamp, value }) => ({
            timeStamp,
            value
          }))
        }))
      )
    };
  }, [rawData]);

  useEffect(() => {
    if (!newData) {
      return;
    }
    setChartData(newData?.data);
    setDataKeyList(newData?.dataKeyList);
  }, [newData]);

  return type === ChartType.LINE_CHART ? (
    <div style={{ ...style }} className={styles.mainWrapper}>
      {users?.length > 0 && (
        <div className={styles.userSelect}>
          <select
            name="dashboard-user-select"
            id="dashboard-user-select"
            defaultValue={initialId}
            onChange={(e) => {
              setCurrentUserId(e.target.value);
            }}
          >
            {users.map(({ name, id }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      )}
      {lineChart(chartData, chartDataKeyList)}
    </div>
  ) : (
    <div style={{ ...style }} className={styles.mainWrapper}>
      {barChart(chartData)}
    </div>
  );
}

export default React.memo(ChartCard);

ChartCard.defaultProps = {
  style: {},
  data: [],
  dataKeyList: []
};
