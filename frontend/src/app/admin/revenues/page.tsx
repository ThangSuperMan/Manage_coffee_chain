'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import Chart from 'chart.js/auto';

const RevenueManagement = () => {
  const [chartType, setChartType] = useState('pie');
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const revenueData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    revenue: [1000, 1500, 1200, 1800, 2000, 2500],
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartType === 'pie') {
      chartInstanceRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: revenueData.labels,
          datasets: [
            {
              label: 'Doanh thu',
              data: revenueData.revenue,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    } else if (chartType === 'column') {
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: revenueData.labels,
          datasets: [
            {
              label: 'Doanh thu',
              data: revenueData.revenue,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [chartType]);

  return (
    <Box p={4} mb="40" maxWidth={600} maxHeight={400}>
      <Heading as="h1" mb={4}>Quản lý Doanh thu</Heading>
      <Box mb={4}>
        <Button
          variant={chartType === 'pie' ? 'solid' : 'outline'}
          onClick={() => handleChartTypeChange('pie')}
        >
          Biểu đồ Pie
        </Button>
        <Button
          variant={chartType === 'column' ? 'solid' : 'outline'}
          onClick={() => handleChartTypeChange('column')}
        >
          Biểu đồ Column
        </Button>
      </Box>
      <canvas ref={chartRef} />
    </Box>
  );
};

export default RevenueManagement;
