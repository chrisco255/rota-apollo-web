import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { makeMainRoutes } from './routes';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  request: (operation) => {
    const token = localStorage.getItem('id_token');
    
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },      
    });
  },
});

const routes = makeMainRoutes();

const App = () => (
  <ApolloProvider client={client}>
    {routes}
  </ApolloProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
