import { useState , React} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
 function PopupCustom(props){
  console.log("123123123")
  const { setShowmodelSuccess, showStatus, message} = props 

  const [show, setShow] = useState(showStatus);

  const handleClose = () => setShowmodelSuccess(false);
  const handleShow = () => setShowmodelSuccess(true);
  return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
  
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