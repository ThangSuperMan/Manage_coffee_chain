import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {}

const PieChart: React.FC = () => {
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // setChartData(props.chartData);
    // setChartOptions(props.chartOptions);
  }, []);

  return <ReactApexChart options={chartOptions} series={chartData} type="pie" width="100%" height="55%" />;
};

export default PieChart;
