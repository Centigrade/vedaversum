import ArticleList from "views/components/ArticleList";
import UserList from "views/components/UserList";
import "views/styles/App.scss";

function App() {
  return (
    <div className="md:p-6 sm:p-4 xl:mx-40 lg:mx-32 md:mx-10 text-gray-600 flex items-start">
      <div className="w-3/4">
        <h1 className="mb-3 text-head font-semibold">Start reading</h1>
        <ArticleList />
      </div>
      <div className="w-1/4">
        <h2 className="mb-3 text-subhead font-semibold pl-8">People online</h2>
        <UserList />
      </div>
    </div>
  );
}

export default App;
