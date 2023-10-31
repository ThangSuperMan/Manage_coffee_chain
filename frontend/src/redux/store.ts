'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './Features/counter/countSlice';
import childCategorySlice from './Features/ChildCategory/childCategorySlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    childCategory: childCategorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
