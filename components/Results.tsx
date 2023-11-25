import { useContext } from "react";
// import "./Results.css";

import { ICharacter } from "../src/types/interface";
import { ResultContext } from "./Context";

export const ResultsAPI = (): JSX.Element => {
  const context = useContext(ResultContext);
  const { results, selectedPageSize, onItemClick } = context;
  const resultsToDisplay = selectedPageSize
    ? results?.slice(0, selectedPageSize)
    : results;
  return (
    <div className="ResultsContainer">
      {resultsToDisplay?.length === 0 ? (
        <p>No cards available</p>
      ) : (
        resultsToDisplay?.map((result: ICharacter) => (
          <div
            className="ResultsApi"
            key={result.url}
            onClick={onItemClick ? () => onItemClick(result) : undefined}
            data-testid="result-card"
          >
            <h3>Name: {result.name}</h3>
            <img src={result.image} alt={result.name} />
            <h3>Species: {result.species}</h3>
            <h3>Status: {result.status}</h3>
            <h3>Location: {result.location.name}</h3>
          </div>
        ))
      )}
    </div>
  );
};
