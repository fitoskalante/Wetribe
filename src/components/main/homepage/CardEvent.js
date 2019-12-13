import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CardEvent(props) {
  return (
    <Card
      className="border-0 shadow-sm rounded-lg my-3"
      style={{ minWidth: "300px" }}
    >
      <Link to={"/event/" + props.event.id}>
        <Card.Img
          className="rounded-0-top"
          variant="top"
          src={props.event.image_url}
        />
      </Link>
      <Card.Body>
        <Card.Title>{props.event.title}</Card.Title>
        <div className="d-flex flex-row container w-100 justify-content-center">
          <Link
            className="btn btn-outline-success rounded-pill col-4 mr-2"
            to={"/event/" + props.event.id}
          >
            See Event
          </Link>
        </div>
      </Card.Body>

      <Card.Footer className="bg-transparent">
        <small className="text-muted">{props.event.date}</small>
      </Card.Footer>
    </Card>
  );
}
