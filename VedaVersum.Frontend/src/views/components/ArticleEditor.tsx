import { useApolloClient, useMutation } from '@apollo/client';
import MDEditor from '@uiw/react-md-editor';
import { CREATE_ARTICLE_MUTATION, UPDATE_ARTICLE_MUTATION } from 'api/article-mutations';
import { VedaVersumArticle } from 'model/veda-versum-article';
import { useState } from 'react';
import 'views/components/styles/popup.scss';

//#region component types
/**
 * type for different editor types
 */
export type EditorType = 'create' | 'edit';

/**
 * type for visual editor settings (e.g. button text)
 */
interface VisualEditorSettings {
  popupTitle: string;
  popupConfirmText: string;
  popupCancelText: string;
  type?: EditorType;
}

/**
 * type for editor props
 */
interface EditorProps {
  closePopup: () => void;
  dataContext?: VedaVersumArticle;
}
//#endregion

function ArticleEditor(props: EditorProps) {
  // needed to pass the article to the api
  const client = useApolloClient();

  //#region state - article variables
  const articleData: VedaVersumArticle | undefined = props.dataContext ? props.dataContext : undefined;
  const [title, setTitle] = useState<string>(articleData ? articleData.title : '');
  const [content, setContent] = useState<string | undefined>(articleData ? articleData.content : 'Content'); // undefined because of the md editor
  const [invalidInput, setInvalidInput] = useState<boolean>(false);

  // event handler for the title input
  const handleTitleInput = (event: any) => {
    setTitle(event.target.value);
  };
  //#endregion

  //#region editor variables
  const editorSettings: VisualEditorSettings = {
    popupTitle: '',
    popupConfirmText: '',
    popupCancelText: '',
    type: 'create',
  };

  if (articleData) {
    editorSettings.popupTitle = 'Edit article';
    editorSettings.popupConfirmText = 'Save data';
    editorSettings.popupCancelText = 'Discard changes';
    editorSettings.type = 'edit';
  } else {
    editorSettings.popupTitle = 'Create new article';
    editorSettings.popupConfirmText = 'Create article';
    editorSettings.popupCancelText = 'Discard data';
  }
  //#endregion

  //#region helper functions and database mutations
  /**
   * validates user input and shows error or confirms changes and closes popup
   */
  function validateInput(): void {
    // validation rule: title must have at least 2 characters
    if (title && title.length < 2) {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);
      if (editorSettings.type === 'create') {
        insertArticle();
        console.log(insertArticleData, loadingInsertArticle, errorInsertArticle);
      } else if (editorSettings.type === 'edit') {
        updateArticle();
        console.log(updateArticleData, loadingUpdateArticle, errorUpdateArticle);
      }
      props.closePopup();
    }
  }

  /**
   * calls database mutation to insert the new article into the database
   */
  const [insertArticle, { data: insertArticleData, loading: loadingInsertArticle, error: errorInsertArticle }] =
    useMutation(CREATE_ARTICLE_MUTATION, {
      variables: { articleTitle: title, articleContent: content },
    });

  /**
   * calls database mutation to update an existing article in the database
   */
  const [updateArticle, { data: updateArticleData, loading: loadingUpdateArticle, error: errorUpdateArticle }] =
    useMutation(UPDATE_ARTICLE_MUTATION, {
      variables: { articleTitle: title, articleContent: content },
    });
  //#endregion

  //#region render component
  return (
    <div data-color-mode="light" className="article-editor">
      {/* header */}
      <div className="w-full flex justify-between bg-primary text-white p-3 rounded-t-lg">
        <p className="text-article-text">{editorSettings.popupTitle}</p>
        <button
          className="hover:cursor-pointer outline outline-4 outline-transparent text-base font-bold text-center py-0 px-1 active:text-primary-dark hover:text-primary-dark"
          onClick={props.closePopup}
        >
          x
        </button>
      </div>
      <div className="m-4 py-4 px-2">
        {/* article title */}
        <div className="mb-7">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleInput}
              minLength={2}
              required
              className={
                'text-subhead text-gray-400 border-b border-gray-400 focus-visible:outline-0 ' +
                (invalidInput ? 'border-b-2 border-red' : '')
              }
            />
            {invalidInput && <span className="mx-2 text-red">The title must have at least 2 characters!</span>}
          </div>
          {/* text editor */}
          <MDEditor value={content} onChange={setContent} preview="edit" height={280} />
        </div>
      </div>
      <div className="m-4 px-2 flex justify-end">
        {/* actions */}
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
