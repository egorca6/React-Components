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
  { id: '4', name: 'Belgorod' },
  { id: '5', name: 'Kazakhstan' },
  { id: '6', name: 'Uzbekistan' },
  { id: '7', name: 'Turkmenistan' },
  { id: '8', name: 'Tajikistan' },
  { id: '9', name: 'Kyrgyzstan' },
  { id: '10', name: 'Armenia' },
  { id: '11', name: 'Azerbaijan' },
  { id: '12', name: 'Georgia' },
  { id: '13', name: 'Moldova' },
  { id: '14', name: 'Estonia' },
  { id: '15', name: 'Latvia' },
  { id: '16', name: 'Lithuania' },
  { id: '17', name: 'Poland' },
  { id: '18', name: 'Germany' },
  { id: '19', name: 'France' },
  { id: '20', name: 'Spain' },
  { id: '21', name: 'Italy' },
  { id: '22', name: 'United Kingdom' },
  { id: '23', name: 'Sweden' },
  { id: '24', name: 'Norway' },
  { id: '25', name: 'Finland' },
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
  },
});

export const { addForm1Data } = formSlice.actions;

export default formSlice.reducer;
