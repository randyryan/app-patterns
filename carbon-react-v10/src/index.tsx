import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { store } from './app/store';
import reportWebVitals from './reportWebVitals';

import './index.scss';
import App from './App';
import LandingPage from './content/LandingPage';
import RepoPage from './content/RepoPage';

const container = document.getElementById('root')!;
const root = createRoot(container);

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
  },
  cache: new InMemoryCache()
})

root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<LandingPage />} />
            <Route path="repos" element={<RepoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
