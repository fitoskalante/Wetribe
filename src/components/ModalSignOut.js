import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalSignOut(props) {
  const logout = async () => {
    const res = await fetch("https://127.0.0.1:5000/logout", {
      headers: {
        Authorization: `Token ${sessionStorage.getItem("token")}`
      }
    });
    if (res.ok) {
      sessionStorage.clear("token");
      props.setUser(null);
    }
  };
  const confirmSignOut = () => {
    logout();
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to sign out?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
        <Button onClick={() => confirmSignOut()}>Sign Out</Button>
      </Modal.Footer>
    </Modal>
  );
}
