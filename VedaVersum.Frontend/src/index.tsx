import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./views/App";

import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { apolloClient } from "./utils/ApolloSetup";
import ArticleDetailsView from "./views/ArticleDetailsView";
import Header from "./views/components/Header";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const Routing = () => {
  return (
    <Router>
      <React.StrictMode>
        <Header />
        <Routes>
          <Route path="*" element={<App />} />
          <Route path="/:id" element={<ArticleDetailsView />} />
        </Routes>
      </React.StrictMode>
    </Router>
  );
};

root.render(
  <ApolloProvider client={apolloClient}>
    <Routing />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
