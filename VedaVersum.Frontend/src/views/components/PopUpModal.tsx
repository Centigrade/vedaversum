import Popup from 'reactjs-popup';

//#region types for the pop up
/**
 * type for the props the pop up needs to work properly
 */
export interface PopUpProps {
  openModalText: string;
  show: (props: PopupHostedView) => any;
}
/**
 * type for the view that is rendered inside the pop up
 */
export interface PopupHostedView {
  closePopup: () => void;
}
//#endregion

//#region render component
function PopUpModal(props: PopUpProps) {
  return (
    <Popup
      trigger={
        <button className="outline outline-4 outline-transparent text-white text-base text-center rounded-lg font-white bg-primary py-2 px-5 mx-2 hover:outline-primary-light active:bg-primary-dark">
          {' '}
          {props.openModalText}{' '}
        </button>
      }
      modal
    >
      {
        function (close: () => void) {
          return <props.show closePopup={close} />;
        } as any
      }
    </Popup>
  );
}
//#endregion
export default PopUpModal;
