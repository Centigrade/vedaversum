import React from "react";
import { Routes, Route } from "react-router-dom";
import { RedirectLandingPage } from "../authentication/RedirectLandingPage";
import { RequireAuth } from "../authentication/RequreAuth";
import "./App.css";
import CardsList from "./cards-list/CardsList";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <CardsList />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<RedirectLandingPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
