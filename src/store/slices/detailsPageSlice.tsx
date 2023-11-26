import { createSlice } from '@reduxjs/toolkit';

const detailsPageSlice = createSlice({
  name: 'detailsPage',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoadingState } = detailsPageSlice.actions;
export default detailsPageSlice.reducer;
