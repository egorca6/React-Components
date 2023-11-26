import { useContext } from "react";
import Image from "next/image";

import { ICharacter } from "../src/types/interface";
import { ResultContext } from "./Context";
import Link from "next/link";

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
            <Link href={`/detail/${result.id}`} key={result.id}>
              <h3>Name: {result.name}</h3>
              <Image
                src={result.image}
                alt={result.name}
                width={300}
                height={300}
              />
              <h3>Species: {result.species}</h3>
              <h3>Status: {result.status}</h3>
              <h3>Location: {result.location.name}</h3>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};
