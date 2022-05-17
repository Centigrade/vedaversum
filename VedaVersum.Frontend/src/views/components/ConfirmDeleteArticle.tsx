import { PopupHostedView } from "views/components/PopUpModal";

function ConfirmDeleteArticle({ closePopup }: PopupHostedView) {
  //  TODO: get article id via URL
  /* get article data from the database */
  /* const { error, data, loading } = useQuery<GetArticleById>(
    ARTICLE_BY_ID_QUERY,
    {
      errorPolicy: "all",
      variables: { articleId: id },
    }
  );
  const currentArticle = data?.articleById; */

  function deleteArticle() {
    // TODO call delete query
  }

  /* *** RENDER COMPONENT *** */
  return (
    <div className="p-2">
      <h4 className="d-flex justify-content-between">
        <span>Confirm delete</span>
        <button className="veda-versum-button" onClick={closePopup}>
          x{" "}
        </button>
      </h4>
      <div className="my-4">
        <h5>
          Are you sure you want to delete the article "[insert title here]"?
          This action cannot be undone!
        </h5>
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="veda-versum-button mx-2"
          onClick={() => {
            deleteArticle();
          }}
        >
          Delete article
        </button>
        <button
          className="veda-versum-button"
          onClick={() => {
            closePopup();
          }}
        >
          Keep article
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteArticle;
