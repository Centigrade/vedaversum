import "reactjs-popup/dist/index.css";

import image from "assets/dummy.png";
import { readAuthContextFromLocalStorage } from "authentication/AutContext";
import { VedaVersumArticle } from "model";
import ConfirmDeleteArticle from "views/components/ConfirmDeleteArticle";
import EditArticle from "views/components/EditArticle";
import PopUpModal from "views/components/PopUpModal";

/* articleData = data from the article that should be displayed
 * preview = true if only a preview of the article should be shown, i.e. in a list of articles
 */
export interface ArticleItemProps {
  articleData: VedaVersumArticle;
  preview: boolean;
}

function ArticleItem(props: ArticleItemProps) {
  const article = props.articleData;

  // get login data for author validation
  const loginData = readAuthContextFromLocalStorage();
  const userEmail = loginData?.user?.email;

  /* *** RENDER COMPONENT *** */
  return (
    <div className="my-2 p-3 text-gray-800">
      <div className="flex">
        <div className="w-3/4">
          <div className="flex items-center text-article-info">
            {/* avatar image */}
            <img
              className="w-1/12 rounded-full mr-2"
              src={image}
              alt="some pic"
            />
            <span className="text-primary mr-2">
              {article.userCreated.split("@")[0]}
            </span>{" "}
            <span>{formatDate(article.created)}</span>
          </div>
          <h4 className="text-article-heading mb-3 font-medium">
            {article.title}{" "}
          </h4>
          <p className="text-article-text">
            {props.preview ? contentPreview(article.content) : article.content}
          </p>
        </div>
        <div className="w-1/4 ml-8">
          <img
            className="border border-solid border-primary"
            src={image}
            alt="some pic"
          />
        </div>
      </div>

      {!props.preview && (
        <div className="flex justify-end items-center mt-3">
          {/* edit article */}
          <PopUpModal show={EditArticle} openModalText="Edit article" />
          {/* delete article - only accessible if logged in user === author */}
          {userEmail === article.userCreated && (
            <PopUpModal
              show={ConfirmDeleteArticle}
              openModalText="Delete article"
            />
          )}
        </div>
      )}
    </div>
  );
}

function formatDate(date: string) {
  console.log(date);
  // format date of creation so it gets readable
  const creationDate = new Date(date);
  const options: object = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  };
  return creationDate.toLocaleDateString("en-GB", options);
}

function contentPreview(content: string) {
  const numberOfCharacters = 100;
  let contentPreview = content;
  return contentPreview.slice(0, numberOfCharacters) + "...";
}

export default ArticleItem;
