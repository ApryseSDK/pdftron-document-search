import React from 'react';

import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider, Results, SearchBox } from '@elastic/react-search-ui';
import { Layout } from '@elastic/react-search-ui-views';
import '@elastic/react-search-ui-views/lib/styles/styles.css';

const connector = new AppSearchAPIConnector({
  searchKey: '[YOUR_SEARCH_KEY]',
  engineName: 'video-games',
  hostIdentifier: '[YOUR_HOST_IDENTIFIER]',
});

const configurationOptions = {
  apiConnector: connector,
};

const Search = () => {
  return (
    <SearchProvider config={configurationOptions}>
      <div className="App">
      <Layout
          header={<SearchBox />}
          bodyContent={<Results titleField="name" urlField="image_url" />}
        />
      </div>
    </SearchProvider>
  );
};

export default Search;
