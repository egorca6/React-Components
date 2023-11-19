import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SearchState {
  value: string;
  pageSize: number;
  isLoading: boolean;
}
const initialState: SearchState = {
  value: '',
  pageSize: 10,
  isLoading: false,
};
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setSearchValue, setPageSize, setLoadingState } =
  searchSlice.actions;
export default searchSlice.reducer;
