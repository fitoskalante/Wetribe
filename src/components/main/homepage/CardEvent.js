import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";

export default function CardEvent(props) {
  return (
    <Card
      className="border-0 shadow-sm rounded-lg my-3 mx-auto mx-md-2 "
      style={{ minWidth: "300px", maxWidth: "500px" }}
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
            className="btn btn-outline-success rounded-pill col-6 mr-2 "
            to={"/event/" + props.event.id}
          >
            See Event
          </Link>
        </div>
      </Card.Body>

      <Card.Footer className="bg-transparent">
        <p className="text-black-50 m-0 text-center d-flex justify-content-center align-items-center py-2">
          <FontAwesomeIcon icon={"calendar-alt"} className="pr-3" size="2x" />{" "}
          <Moment format="YYYY/MM/DD">{props.event.date}</Moment>
        </p>
      </Card.Footer>
    </Card>
  );
}
