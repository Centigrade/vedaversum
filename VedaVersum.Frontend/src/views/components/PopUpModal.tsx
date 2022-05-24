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
        <button className="outline outline-4 outline-transparent text-white text-base text-center rounded-lg font-white bg-primary py-2 px-4 mx-2 hover:outline-primary-hover active:bg-primary-dark">
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
