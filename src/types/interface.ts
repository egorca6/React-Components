import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}
export interface SearchFormState {
  searchTerm: string;
}

export interface ICharacter {
  url: string;
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  type: string;
  episode: [];
  location: {
    name: string;
  };
}

export interface EpisodeDetails {
  id: number;
  name: string;
  episode: string;
}
export interface ICharacterArray {
  results: ICharacter[];
}
export interface ResultContextProps {
  results: ICharacter[];
  error: FetchBaseQueryError | SerializedError | undefined;
  selectedPageSize: number;
  onItemClick: (result: ICharacter) => void;
}

export interface ResultsAPIProps {
  results: ICharacter[];
  error: Error | null;
  selectedPageSize: number;
  onItemClick: (result: ICharacter) => void;
}

export interface AppState {
  userInput: string;
  results: ICharacter[];
  error: Error | null;
  loading: boolean;
}

export interface DetailsProps {
  characterDetails: ICharacter;
  onClose: () => void;
}
