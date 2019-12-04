import React from "react";
import { Jumbotron, Button } from "react-bootstrap";

export default function Homepage() {
  return (
    <>
      <Jumbotron className="bg-transparent h-100 p-0 m-0 d-flex flex-column text-white justify-content-center">
        <h1>Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
    </>
  );
}
