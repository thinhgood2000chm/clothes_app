import { useState , React} from 'react';
import Modal from 'react-bootstrap/Modal';
 function PopupCustom(props){
  const { setShowmodelSuccess, showStatus, message} = props 

  const [show, setShow] = useState(showStatus);

  const handleClose = () => setShowmodelSuccess(false);
  const handleShow = () => setShowmodelSuccess(true);
  return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
        </Modal>
      </>
    );
  }
  


export default PopupCustom;