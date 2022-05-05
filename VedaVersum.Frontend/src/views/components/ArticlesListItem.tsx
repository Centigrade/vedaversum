import image from "../../assets/dummy.png";

function ArticlesListItem(articleData: any) {
  const article = articleData.articleData;

  // TODO: add edit & delete button if the article is from the user currently logged in
  // TODO: add remove upvote button
  return (
    <div className="border border-primary my-2 p-3">
      <div className="d-flex">
        <div className="w-75">
          <h4>{article.title} </h4>
          <p>{formatDate(article.created)}</p>
          <p>{article.content}</p>
        </div>
        <div className="w-25">
          <img
            className="article-image"
            src={article.assignedUsers[0].avatarUrl || image}
            alt="some pic"
          />
        </div>
      </div>

      {/* author and upvotes */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex align-items-center">
          Author: {article.userCreated.split("@")[0]}
        </div>
      </div>
    </div>
  );
}

function formatDate(date: string) {
  // format date of creation so it gets readable
  const creationDate = new Date(date);
  const options: object = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return creationDate.toLocaleDateString("en-GB", options);
}

export default ArticlesListItem;
