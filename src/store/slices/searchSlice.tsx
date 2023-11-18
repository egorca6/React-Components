import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SearchState {
  value: string;
  pageSize: number;
}
const initialState: SearchState = {
  value: '',
  pageSize: 10,
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
  },
});
export const { setSearchValue, setPageSize } = searchSlice.actions;
export default searchSlice.reducer;
