import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { PopupHostedView } from 'views/components/PopUpModal';
import 'views/styles/articleEditor.scss';

interface EditorSettings {
  popupTitle: string;
  popupConfirmText: string;
  popupCancelText: string;
}

function ArticleEditor(props: PopupHostedView) {
  //#region state - article variables
  const [content, setContent] = useState<string | undefined>('Content');
  const [title, setTitle] = useState<string | undefined>('Title');
  const [invalidInput, setInvalidInput] = useState<boolean>(false);

  const handleTitleInput = (event: any) => {
    setTitle(event.target.value);
  };
  //#endregion

  //#region editor variables
  const editorSettings: EditorSettings = {
    popupTitle: '',
    popupConfirmText: '',
    popupCancelText: '',
  };

  switch (props.type) {
    case 'create':
      editorSettings.popupTitle = 'Create new article';
      editorSettings.popupConfirmText = 'Create article';
      editorSettings.popupCancelText = 'Discard data';
      break;
    case 'edit':
      editorSettings.popupTitle = 'Edit article';
      editorSettings.popupConfirmText = 'Save data';
      editorSettings.popupCancelText = 'Discard changes';
      // TODO: call getArticleById
      break;
    default:
      break;
  }
  //#endregion

  //#region helper functions

  //  TODO: getArticleById via URL
  /* get article data from the database */
  /* const { error, data, loading } = useQuery<GetArticleById>(
    ARTICLE_BY_ID_QUERY,
    {
      errorPolicy: "all",
      variables: { articleId: id },
    }
  );
  const currentArticle = data?.articleById; */

  /**
   * TODO:
   */
  function validateInput(): void {
    if (title && title.length < 2) {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);
      console.log('validation successful, inserting article...');
      // TODO: call create/update query
      props.closePopup();
    }
  }

  //#endregion

  //#region render component
  return (
    <div data-color-mode="light">
      <div className="w-full flex justify-between bg-primary text-white p-3 rounded-t-lg">
        <h1>{editorSettings.popupTitle}</h1>
        <button
          className="hover:cursor-pointer outline outline-4 outline-transparent text-base font-bold text-center py-0 px-1 active:text-primary-dark hover:text-primary-dark"
          onClick={props.closePopup}
        >
          x
        </button>
      </div>
      <div className="m-4 py-4 px-2">
        <div className="mb-7">
          <input
            type="text"
            value={title}
            onChange={handleTitleInput}
            minLength={2}
            required
            className={
              'text-subhead text-gray-400 border-b border-gray-400 focus-visible:outline-0' +
              (invalidInput ? 'border-b-2 border-red' : '')
            }
          />
          {invalidInput && <span className="mx-2 text-red">The title must have at least 2 characters!</span>}
        </div>
        {/* text editor */}
        <MDEditor value={content} onChange={setContent} preview="edit" height={280} />
      </div>
      <div className="m-4 px-2 flex justify-end">
        {/* save changes */}
        <button
          className="hover:cursor-pointer outline outline-4 outline-transparent text-white text-base text-center rounded-lg font-white bg-primary py-2 px-3 mr-4 hover:outline-primary-light active:bg-primary-dark disabled:bg-primary-dark disabled:outline-transparent disabled:cursor-auto"
          onClick={() => {
            validateInput();
          }}
          disabled={!title}
        >
          {editorSettings.popupConfirmText}
        </button>
        {/* discard changes */}
        <button
          className="hover:cursor-pointer outline outline-4 outline-transparent text-white text-base text-center rounded-lg font-white bg-gray-800 py-2 px-3 hover:outline-gray-400 active:bg-gray-600"
          onClick={() => {
            props.closePopup();
          }}
        >
          {editorSettings.popupCancelText}
        </button>
      </div>
    </div>
  );
}
//#endregion
export default ArticleEditor;
