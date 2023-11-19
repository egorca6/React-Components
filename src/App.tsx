import { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { ResultsAPI } from './components/Results';
import './App.css';
import { fetchDetails } from './rest api/character';
import { Details } from './components/Details';
import { ResultContext, SearchContext } from './utils/Context';
import Pagination from './components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { setPageSize } from './store/slices/searchSlice';
import { ICharacter } from './types/interface';
import {
  useGetCharacterByNameQuery,
  useGetCharacterByPageQuery,
} from './store/slices/api/api';

export const App = () => {
  const dispatch = useDispatch();
  const pageSize = useSelector((state: RootState) => state.search.pageSize);
  const storedUserInput = localStorage.getItem('userInput');
  const [userInput, setUserInput] = useState(storedUserInput || '');
  const [isPagination, setIsPagination] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacterId, setSelectedCharacterId] = useState<
    number | null
  >();
  const [characterDetails, setCharacterDetails] = useState<ICharacter | null>(
    null
  );

  const handleSelectedCharacter = (characterId: number) => {
    setSelectedCharacterId(characterId);
    fetchDetails(characterId).then((details) => {
      setCharacterDetails(details);
    });
  };

  const handleSelectedCharacterFromResults = (result: ICharacter) => {
    handleSelectedCharacter(result.id);
  };

  const handleClearSelection = () => {
    setSelectedCharacterId(null);
    setCharacterDetails(null);
  };

  const {
    data: characterByPageData,
    // isLoading: isCharacterByPageLoading,
    // error: characterByPageError,
  } = useGetCharacterByPageQuery({
    page: currentPage,
    pageSize: pageSize,
  });

  const resultsArray2 = characterByPageData?.results ?? [];
  // useGetCharacterByPageQuery({ page: 1, pageSize: 10 });
  // useGetCharacterByNameQuery('rick');
  const { data, isLoading, error } = useGetCharacterByNameQuery(userInput);
  let resultsArray = data?.results ?? [];

  console.log('isLoading', isLoading);
  const handleSearch = (userInput: string) => {
    localStorage.setItem('userInput', userInput);
    setUserInput(userInput);
    setIsPagination(false);
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsPagination(true);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    dispatch(setPageSize(newPageSize));
    resultsArray = resultsArray2;
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalResults={characterByPageData?.results.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
        <SearchContext.Provider
          value={{
            onSearch: handleSearch,
            searchTerm: userInput,
          }}
        >
          <SearchForm />
        </SearchContext.Provider>

        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <ResultContext.Provider
            value={{
              results: isPagination ? resultsArray2 : resultsArray,
              error,
              selectedPageSize: pageSize,
              onItemClick: handleSelectedCharacterFromResults,
            }}
          >
            <ResultsAPI />
          </ResultContext.Provider>
        )}
      </div>

      {selectedCharacterId && characterDetails && (
        <Details
          characterDetails={characterDetails}
          onClose={handleClearSelection}
        />
      )}
    </div>
  );
};
