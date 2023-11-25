import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "./Context";
import { RootState } from "@/store/store";
import { setSearchValue } from "@/store/slices/searchSlice";

export const SearchForm = (): JSX.Element => {
  const context = useContext(SearchContext);

  const searchValue = useSelector((state: RootState) => state.search.value);
  const dispatch = useDispatch();

  const handleSearch = () => {
    context.onSearch(searchValue);
  };
  const handleSearchEnter = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
    console.log("Search value:", searchValue);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="SearchFormContainer">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchEnter}
        onKeyDown={handleKeyPress}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
