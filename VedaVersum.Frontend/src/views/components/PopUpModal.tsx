import Popup from 'reactjs-popup';

//#region types for the pop up
/**
 * type for the props the pop up needs to work properly
 */
export interface PopUpProps {
  /**
   * text that is shown on the button that opens the pop up
   */
  openModalText: string;
  type: string;
  articleId: string;
  show: (props: PopupHostedView) => any;
}

/**
 * type for the view that is rendered inside the pop up
 */
export interface PopupHostedView {
  closePopup: () => void;
  type: string;
  articleId: string;
}
//#endregion

//#region render component
function PopUpModal(props: PopUpProps) {
  return (
    <Popup
      trigger={
        <button className="outline outline-4 outline-transparent text-white text-base text-center rounded-lg font-white bg-primary py-2 px-3 hover:outline-primary-light active:bg-primary-dark">
          {' '}
          {props.openModalText}{' '}
        </button>
      }
      modal
    >
      {
        function (close: () => void) {
          return <props.show closePopup={close} type={props.type} articleId={props.articleId} />;
        } as any
      }
    </Popup>
  );
}
//#endregion
export default PopUpModal;
