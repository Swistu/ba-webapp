/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Chart } from 'chart.js';
import * as Chartjs from 'chart.js';

const controllers: any = Object.values(Chartjs).filter(
  (chart: any) => chart.id !== undefined
);

Chart.register(...controllers);

import { Bar } from 'react-chartjs-2';
const PieChart = ({ chartData }: { chartData: any }) => {
  return <Bar datasetIdKey="id" data={chartData} />;
};

export default PieChart;
