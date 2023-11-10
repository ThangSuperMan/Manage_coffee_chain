'use client';

import { RootState } from '@/redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount } from '@/redux/Features/counter/countSlice';
import PieChart from '@/components/Chart/PieChart';

const AdminDashboard: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <main>
      <PieChart />
    </main>
  );
};

export default AdminDashboard;
