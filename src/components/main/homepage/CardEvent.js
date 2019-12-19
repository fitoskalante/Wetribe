import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";

export default function CardEvent(props) {
  return (
    <Card
      className="border-0 shadow-sm rounded-lg my-3 mx-auto mx-md-2 shadow-custom"
      style={{ minWidth: "300px", maxWidth: "364px" }}
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
            className="btn btn-outline-success rounded-pill  mr-2 "
            to={"/event/" + props.event.id}
            style={{ width: "140px" }}
          >
            See Event
          </Link>
        </div>
        <h5 className="text-black-50 m-0 text-center d-flex justify-content-center align-items-center pt-2">
          <FontAwesomeIcon icon={"calendar-alt"} className="pr-3" size="2x" />{" "}
          <Moment format="YYYY/MM/DD">{props.event.date}</Moment>
        </h5>
      </Card.Body>

      <Card.Footer
        className="d-flex flex-row bg-transparent align-items-center justify-content-center"
        style={{ height: "77px" }}
      >
        <div className="d-flex flex-wrap justify-content-center">
          {props.event.categories &&
            props.event.categories.map(c => {
              return (
                <Badge pill variant="info" className="m-1" key={c.id}>
                  {c.name}
                </Badge>
              );
            })}
        </div>
      </Card.Footer>
    </Card>
  );
}
