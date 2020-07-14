import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
} from 'react-instantsearch-dom';
import { Box, Container, Heading } from 'gestalt';
import 'gestalt/dist/gestalt.css';

const Search = () => {
  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
  );

  return (
    <Box padding={3}>
      <Container>
        <Box padding={3}>
          <Heading size="md">Search</Heading>
        </Box>
        <Box padding={2}>
          <InstantSearch
            indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
            searchClient={searchClient}
          >
            <SearchBox />
            <Hits />
            <RefinementList attribute="ext" />
          </InstantSearch>
        </Box>
      </Container>
    </Box>
  );
};

export default Search;
