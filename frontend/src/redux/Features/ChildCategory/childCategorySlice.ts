'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ChildcategoryState {
  value: string;
}

const initialState: ChildcategoryState = {
  value: 'Tất cả',
};

export const childCategorySlice = createSlice({
  name: 'childCategory',
  initialState,
  reducers: {
    addCurrentActiveChildCategory: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { addCurrentActiveChildCategory } = childCategorySlice.actions;

export default childCategorySlice.reducer;
