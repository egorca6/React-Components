import { createSlice } from '@reduxjs/toolkit';

export interface FormState {
  form1Data: {
    firstName: string;
    gender: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    subscribe: boolean;
    file: File | null;
    country: string;
    isNew: boolean;
  }[];
  countries: { id: string; name: string }[];
}

const initialCountries = [
  { id: '1', name: 'Russia' },
  { id: '2', name: 'Ukraine' },
  { id: '3', name: 'Belarus' },
];
const initialState: FormState = {
  form1Data: [],
  countries: initialCountries,
};

export const formSlice = createSlice({
  name: 'dataForm',
  initialState,
  reducers: {
    addForm1Data: (state, action) => {
      state.form1Data.forEach((formData) => {
        formData.isNew = false;
      });
      state.form1Data.push({
        ...action.payload,
        isNew: true,
      });
    },
    clearFormData: () => {
      return initialState;
    },
  },
});

export const { addForm1Data, clearFormData } = formSlice.actions;

export default formSlice.reducer;
