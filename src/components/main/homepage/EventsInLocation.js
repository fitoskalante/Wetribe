import React, { useEffect, useState } from "react";
import { CardDeck, Spinner } from "react-bootstrap";
import CardEvent from "./CardEvent";

export default function EventList(props) {
  return (
    <>
      <div className="container-fluid py-5 bg-light">
        <div className="container text-center">
          <CardDeck className="">
            {props.list ? (
              props.list.map(event => (
                <CardEvent event={event} key={event.id} />
              ))
            ) : (
              <>
                <Spinner animation="border" role="status" variant="success">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </>
            )}
          </CardDeck>
        </div>
      </div>
    </>
  );
}
