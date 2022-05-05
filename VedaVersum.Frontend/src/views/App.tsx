import { Route, Routes } from "react-router-dom";
import { RedirectLandingPage } from "../authentication/RedirectLandingPage";
import { RequireAuth } from "../authentication/RequreAuth";
import "./App.css";
import ArticlesList from "./components/ArticlesList";
import UsersList from "./components/UsersList";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route
          path="*"
          element={
            <RequireAuth>
              <div className="d-flex">
                <ArticlesList />
                <UsersList />
              </div>
            </RequireAuth>
          }
        />
        <Route path="/login" element={<RedirectLandingPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
