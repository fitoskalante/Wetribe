import React from "react";
import illustration from "../../../img/headerpic.png";
import { Jumbotron, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HeaderHome(props) {
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
          {!props.user ? (
            <>
              <h3 className="display-4 font-weight-bold text-white header-text">
                small steps make
              </h3>
              <h1 className="display-4 font-weight-bold text-white header-text">
                BIG CHANGES
              </h1>

              <Link to="/auth/signup">
                <Button
                  className="btn btn-primary shadow btn-lg rounded-pill my-5  font-weight-bold"
                  style={{ width: "250px" }}
                >
                  Join Wetribe
                </Button>
              </Link>
            </>
          ) : (
            <>
              <h3 className="display-4 font-weight-bold text-white header-text">
                It is time to
              </h3>
              <h1 className="display-4 font-weight-bold text-white header-text">
                MAKE THE CHANGE
              </h1>

              <Link to="/create-event">
                <Button
                  className="btn btn-primary shadow btn-lg rounded-pill my-5 font-weight-bold"
                  style={{ width: "250px" }}
                >
                  Create your Tribe
                </Button>
              </Link>
            </>
          )}
        </Container>
      </Jumbotron>
    </>
  );
}
