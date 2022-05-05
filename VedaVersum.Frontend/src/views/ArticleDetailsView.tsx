import { useParams } from "react-router-dom";
import { RequireAuth } from "../authentication/RequreAuth";
// import ArticleDetails from "./components/ArticleDetails";
import UsersList from "./components/UsersList";

function ArticleDetailsView() {
  console.log(useParams());
  const { id } = useParams();

  // load article data by id

  return (
    <RequireAuth>
      <div className="d-flex">
        redirected to: {id}
        {/* <ArticleDetails articleData={} /> */}
        <UsersList />
      </div>
    </RequireAuth>
  );
}

export default ArticleDetailsView;
