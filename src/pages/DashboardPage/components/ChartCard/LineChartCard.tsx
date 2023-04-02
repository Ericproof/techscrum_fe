import React, { useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { IDashBoardDailyScrum } from '../../../../types';
import styles from './LineChartCard.module.scss';

type Props = {
  data?: IDashBoardDailyScrum[];
  type: ChartType;
  style?: React.CSSProperties;
};

export enum ChartType {
  BAR_CHART = 'barChart',
  LINE_CHART = 'lineChart'
}

function LineChartCard({ style, data, type }: Props) {
  window.console.log('re-render');
  useEffect(() => {
    window.console.log('style', style);
  }, [style]);

  useEffect(() => {
    window.console.log('data', data);
  }, [data]);

  useEffect(() => {
    window.console.log('type', type);
  }, [type]);

  return (
    <div style={{ ...style }} className={styles.mainWrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.memo(LineChartCard);

LineChartCard.defaultProps = {
  style: {},
  data: []
};
