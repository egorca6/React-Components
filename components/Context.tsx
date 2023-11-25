import { createContext } from "react";
import { ResultContextProps } from "../src/types/interface";

export const ResultContext = createContext<Partial<ResultContextProps>>({});
export const SearchContext = createContext({
  onSearch: (userInput: string) => {},
  searchTerm: "",
});
