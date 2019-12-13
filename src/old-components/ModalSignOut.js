import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalSignOut(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to sign out?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
        <Button onClick={props.onClick}>Sign Out</Button>
      </Modal.Footer>
    </Modal>
  );
}
