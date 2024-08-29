import { useInstantSearch } from 'react-instantsearch-hooks-web';

export const NoResults = () => {
  const { indexUiState } = useInstantSearch();

  return (
    <div className="pt-2">
      <p>
        No results for{' '}
        <strong>
          <q>{indexUiState.query}</q>
        </strong>
        .
      </p>
    </div>
  );
};
