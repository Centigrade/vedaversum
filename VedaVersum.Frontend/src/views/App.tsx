import "./App.css";
import ArticlesList from "./components/ArticlesList";
import UsersList from "./components/UsersList";

function App() {
  return (
    <div className="d-flex">
      <ArticlesList />
      <UsersList />
    </div>
  );
}

export default App;
