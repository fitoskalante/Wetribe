import React from "react";
import illustration from "../../../img/headerpic.png";
import { Jumbotron, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HeaderHome() {
  return (
    <>
      <Jumbotron
        fluid
        className="bg-white m-0"
        style={{
          backgroundImage: `url(${illustration})`,
          backgroundSize: "cover"
        }}
      >
        <Container className="text-center">
          <h3 className="display-4 font-weight-bold text-white header-text">
            small steps make
          </h3>
          <h1 className="display-4 font-weight-bold text-white header-text">
            BIG CHANGES
          </h1>
          <Link to="/auth/signup">
            <Button className="btn btn-primary shadow btn-lg rounded-pill my-5 col-8 col-sm-3">
              Join
            </Button>
          </Link>
        </Container>
      </Jumbotron>
    </>
  );
}
