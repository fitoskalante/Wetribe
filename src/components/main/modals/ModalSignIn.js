import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalSignIn(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h4>To Join the event you have to sign in</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.onHide}>
          Cancel
        </Button>
        <Button onClick={props.onClick}>Sign In</Button>
      </Modal.Footer>
    </Modal>
  );
}
