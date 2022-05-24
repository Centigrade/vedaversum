import "reactjs-popup/dist/index.css";

import placeholderAvatarImage from "assets/dummy.png";
import placeholderArticleImage from "assets/PlaceholderArticleImage.png";
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
    <div className="mb-5 text-gray-800 ">
      <div className="flex items-center text-article-info">
        {/* avatar image */}
        <img
          className="w-6 rounded-full mr-2"
          src={placeholderAvatarImage}
          alt="some pic"
        />
        <span className="text-primary mr-2">
          {formatAuthor(article.userCreated)}
        </span>{" "}
        <span>{formatDate(article.created)}</span>
      </div>
      <div className="flex items-between">
        <div className="w-3/4">
          <h4 className="text-article-heading mb-3 font-medium">
            {article.title}{" "}
          </h4>
          <p className="text-article-text">
            {props.preview ? contentPreview(article.content) : article.content}
          </p>
        </div>
        <div className="w-1/4 ml-8">
          <img src={placeholderArticleImage} alt="some pic" />
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

function contentPreview(content: string): string {
  const numberOfCharacters = 220;
  let contentPreview = content;
  return contentPreview.slice(0, numberOfCharacters) + "...";
}

function formatDate(date: string): string {
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
  const dateString = creationDate.toLocaleDateString("en-GB", options);
  return " – " + dateString;
}

function formatAuthor(authorEmail: string): string {
  return authorEmail.split("@")[0];
}

export default ArticleItem;
