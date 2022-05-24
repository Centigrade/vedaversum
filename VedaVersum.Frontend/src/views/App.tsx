import ArticleList from "views/components/ArticleList";
import UserList from "views/components/UserList";
import "views/styles/App.scss";

function App() {
  return (
    <div className="p-6 mx-40 text-gray-600">
      <div className="flex items-center">
        <h1 className="w-3/4 mb-3 text-head font-semibold">Start reading</h1>
        <h2 className="w-1/4 mb-3 text-subhead font-semibold pl-8">
          People online
        </h2>
      </div>
      <div className="text-gray-600 flex">
        <ArticleList />
        <UserList />
      </div>
    </div>
  );
}

export default App;
