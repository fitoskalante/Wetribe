import React from "react";
import { CardDeck, Card } from "react-bootstrap";

export default function CardEvent(props) {
  return (
    <Card className="border-0 shadow rounded-custom">
      <Card.Img
        className="rounded-0"
        variant="top"
        src={props.event.image_url}
      />
      <Card.Body>
        <Card.Title>{props.event.title}</Card.Title>
        <Card.Text>{props.event.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="bg-transparent">
        <small className="text-muted">{props.event.date}</small>
      </Card.Footer>
    </Card>
  );
}
