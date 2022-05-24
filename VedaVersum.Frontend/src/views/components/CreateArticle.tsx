import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { PopupHostedView } from 'views/components/PopUpModal';

function CreateArticle({ closePopup }: PopupHostedView) {
  // article variables:
  const [content, setContent] = useState<string | undefined>('**Hello world**');
  const [title, setTitle] = useState<string | undefined>('');
  const [invalidInput, setInvalidInput] = useState<boolean>(false);

  const handleTitleInput = (event: any) => {
    setTitle(event.target.value);
  };

  function validateInput() {
    if (title && title.length < 2) {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);
      console.log('validation successful, inserting article...');
      // TODO: call insert query
      closePopup();
    }
  }

  function discardData() {
    // resetting the entries should happen automatically on close or rather on new open
    setTitle('');
    setContent('');
    closePopup();
  }

  //#region render component
  return (
    <div className="p-2">
      <h4 className="d-flex justify-content-between">
        <span>Create new article</span>
        <button className="veda-versum-button" onClick={closePopup}>
          x
        </button>
      </h4>
      <div className="my-4">
        <div className="my-3">
          <label htmlFor={'title'} className="mx-2">
            <h5>Title:</h5>
          </label>
          <input
            id={'title'}
            type={'text'}
            value={title}
            onChange={handleTitleInput}
            minLength={2}
            required
            className={invalidInput ? 'border border-danger' : ''}
          />
          {invalidInput && <span className="mx-2 text-danger">Title must have at least 2 characters!</span>}
        </div>
        <div className="p-2">
          <h5>Content:</h5>
          <MDEditor data-color-mode="light" value={content} onChange={setContent} />
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="veda-versum-button mx-2"
          onClick={() => {
            validateInput();
          }}
          disabled={!title}
        >
          Create article
        </button>
        <button
          className="veda-versum-button"
          onClick={() => {
            discardData();
          }}
        >
          Discard data
        </button>
      </div>
    </div>
  );
}
//#endregion
export default CreateArticle;
