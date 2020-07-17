import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  connectHits,
  RefinementList,
} from 'react-instantsearch-dom';
import { navigate } from '@reach/router';
import { Box, Container, Button, Heading, Table, Text } from 'gestalt';
import { setDocToView } from '../View/ViewSlice';
import 'gestalt/dist/gestalt.css';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
  );

  const setDoc = (docRef, pageNumber) => {
    dispatch(setDocToView({docRef, searchTerm, pageNumber}));
    console.log(docRef, pageNumber, searchTerm);
  };

  const Hit = hit => {
    return (
      <Table.Row key={hit.objectID}>
        <Table.Cell>
          <Text>{hit.title}</Text>
        </Table.Cell>
        <Table.Cell>
          <Text>{hit.pageText}</Text>
        </Table.Cell>
        <Table.Cell>
          <Button
            onClick={event => {
              setDoc(hit.docRef, hit.pageNumber);
              navigate(`/view`);
            }}
            text="View"
            color="blue"
            inline
          />
        </Table.Cell>
      </Table.Row>
    );
  };

  const Hits = ({ hits }) => {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Title</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Page Text</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{hits.map(Hit)}</Table.Body>
      </Table>
    );
  };

  const CustomHits = connectHits(Hits);

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
            onSearchStateChange={searchState => {
              setSearchTerm(searchState.query);
            }}
          >
            <SearchBox />
            <CustomHits />
            <RefinementList attribute="ext" />
          </InstantSearch>
        </Box>
      </Container>
    </Box>
  );
};

export default Search;
