import ArticleList from "views/components/ArticleList";
import UserList from "views/components/UserList";
import "views/styles/App.scss";

function App() {
  return (
    <div className="app">
      <ArticleList />
      <UserList />
    </div>
  );
}

export default App;
