import React, { Component } from 'react';
import { Results } from '../types/interface';
import './Results.css';

export class ResultsAPI extends Component<{
  results: Results[];
  error: Error | null;
}> {
  render() {
    const { results, error } = this.props;

    if (error) {
      return (
        <div>
          <p>Error: {error.message}</p>
          <button
            onClick={() => {
              throw new Error('Test Error');
            }}
          >
            Throw Error
          </button>
        </div>
      );
    }

    return (
      <div className="ResultsContainer">
        {results.map((result) => (
          <div key={result.url}>
            <h3>Name:{result.name}</h3>
            <h3>Mass:{result.mass}</h3>
            <h3>Skin Color:{result.skin_color}</h3>
            <h3>Gender:{result.gender}</h3>
            <h3>Eye color:{result.eye_color}</h3>
          </div>
        ))}
      </div>
    );
  }
}
