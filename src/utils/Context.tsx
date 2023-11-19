import { createContext } from 'react';
import { ResultContextProps } from '../types/interface';
/* eslint-disable @typescript-eslint/no-unused-vars */
export const ResultContext = createContext<Partial<ResultContextProps>>({});
export const SearchContext = createContext({
  onSearch: (userInput: string) => {},
  searchTerm: '',
});
/* eslint-enable @typescript-eslint/no-unused-vars */
