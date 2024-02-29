import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache,createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// const client = new ApolloClient({
//   uri:"http://localhost:1337/graphql",
//   cache: new InMemoryCache()
// })

const httpLink = createHttpLink({
  uri: 'https://note-book-app-backend.vercel.app/

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>
);

