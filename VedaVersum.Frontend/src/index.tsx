import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LandingPage from './views/App';

import { ApolloProvider } from '@apollo/client';
import Header from 'Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RedirectLandingPage } from './authentication/RedirectLandingPage';
import { RequireAuth } from './authentication/RequreAuth';
import { apolloClient } from './utils/ApolloSetup';
import ArticleDetailsView from './views/ArticleDetailsView';
import PageNotFound from './views/PageNotFound';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const Routing = () => {
  return (
    <Router>
      <Header />
      <React.StrictMode>
        <Routes>
          <Route
            path="*"
            element={
              <RequireAuth>
                <LandingPage />
              </RequireAuth>
            }
          />
          <Route
            path="/:id"
            element={
              <RequireAuth>
                <ArticleDetailsView />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<RedirectLandingPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </React.StrictMode>
    </Router>
  );
};

root.render(
  <ApolloProvider client={apolloClient}>
    <Routing />
  </ApolloProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
