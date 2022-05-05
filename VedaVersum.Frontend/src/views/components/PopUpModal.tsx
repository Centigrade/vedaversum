import Popup from "reactjs-popup";

export interface PopUpProps {
  openModalText: string;
  show: (props: PopupHostedView) => any;
}
export interface PopupHostedView {
  closePopup: () => void;
}

function PopUpModal(props: PopUpProps) {
  return (
    <Popup
      trigger={
        <button className="veda-versum-button mx-2">
          {" "}
          {props.openModalText}{" "}
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

export default PopUpModal;
