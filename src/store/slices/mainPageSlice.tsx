import { createSlice } from '@reduxjs/toolkit';

const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoadingState } = mainPageSlice.actions;
export default mainPageSlice.reducer;
