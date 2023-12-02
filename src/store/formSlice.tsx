import { createSlice } from '@reduxjs/toolkit';

export interface FormState {
  form1Data: {
    firstName: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    subscribe: boolean;
  }[];
}

const initialState: FormState = {
  form1Data: [],
};

export const formSlice = createSlice({
  name: 'dataForm',
  initialState,
  reducers: {
    addForm1Data: (state, action) => {
      state.form1Data.push({
        ...action.payload,
      });
    },
    clearFormData: () => {
      return initialState;
    },
  },
});

export const { addForm1Data, clearFormData } = formSlice.actions;

export default formSlice.reducer;
