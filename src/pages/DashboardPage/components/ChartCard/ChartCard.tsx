import React from 'react';
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
// import { IDashBoardDailyScrum } from '../../../../types';
import styles from './ChartCard.module.scss';

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
        barSize={50}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar key={crypto.randomUUID()} dataKey="count" fill="#8884d8" />;
      </BarChart>
    </ResponsiveContainer>
  );
}
function ChartCard({ style, dataKeyList, data, type }: Props) {
  return type === ChartType.LINE_CHART ? (
    <div style={{ ...style }} className={styles.mainWrapper}>
      {lineChart(data, dataKeyList)}
    </div>
  ) : (
    <div style={{ ...style }} className={styles.mainWrapper}>
      {barChart(data)}
    </div>
  );
}

export default React.memo(ChartCard);

ChartCard.defaultProps = {
  style: {},
  data: [],
  dataKeyList: []
};
