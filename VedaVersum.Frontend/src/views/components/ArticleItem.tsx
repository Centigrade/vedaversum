import image from "../../assets/dummy.png";
import { VedaVersumCard } from "../../model";

/* articleData = data from the article that should be displayed
 * preview = true if only a preview of the article should be shown, i.e. in a list of articles
 */
export interface ArticleItemProps {
  articleData: VedaVersumCard;
  preview: boolean;
}

function ArticlesItem(props: ArticleItemProps) {
  const article = props.articleData;

  console.log("preview:");
  console.log(props.preview);

  // TODO: if !preview add edit & delete button
  return (
    <div className="border border-primary my-2 p-3">
      <div className="d-flex">
        <div className="w-75">
          <h4>{article.title} </h4>
          <p>{formatDate(article.created)}</p>
          <p>
            {props.preview ? contentPreview(article.content) : article.content}
          </p>
        </div>
        <div className="w-25">
          <img className="article-image" src={image} alt="some pic" />
        </div>
      </div>

      {/* author */}
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

function contentPreview(content: string) {
  const numberOfCharacters = 100;
  let contentPreview = content;
  return contentPreview.slice(0, numberOfCharacters) + "...";
}

export default ArticlesItem;
