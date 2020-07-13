import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const Search = () => {
  const searchClient = algoliasearch('YourApplicationID', 'YourSearchOnlyAPIKey');

  return (
    <InstantSearch indexName="bestbuy" searchClient={searchClient}>
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
};

export default Search;
