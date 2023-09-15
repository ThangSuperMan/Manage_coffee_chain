'use client';

import { RootState } from '@/redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount } from '@/redux/Features/counter/countSlice';

const AdminDashboard: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-200">
      <h1 className="text-3xl">Admin Dashboard</h1>
      <button className="bg-blue-200 p-2 text-center" onClick={() => dispatch(increment())}>
        Increment
      </button>
      <span>{count}</span>
      <button className="bg-red-200 p-2 text-center" onClick={() => dispatch(decrement())}>
        Decrement
      </button>
      <button className="bg-green-200 p-2 text-center" onClick={() => dispatch(incrementByAmount(2))}>
        Decrement by 2
      </button>
    </main>
  );
};

export default AdminDashboard;
