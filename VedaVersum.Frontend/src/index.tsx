import { ApolloProvider } from '@apollo/client';
import Header from 'Header';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from 'store/store';
import { RedirectLandingPage } from './authentication/RedirectLandingPage';
import { RequireAuth } from './authentication/RequreAuth';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { apolloClient } from './utils/ApolloSetup';
import App from './views/App';
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
                <App />
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
    <Provider store={store}>
      <Routing />
    </Provider>
  </ApolloProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
