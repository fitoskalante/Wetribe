import React from "react";
import { Accordion, Media, Image, Form, Button } from "react-bootstrap";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory, useParams } from "react-router-dom";

export default function AutoCompletePlaces({
  e,
  leaveEvent,
  joinEvent,
  onSubmit,
  register,
  handleSubmit,
  myEvent,
  joined
}) {
  const history = useHistory();
  const params = useParams();

  return (
    <>
      <Accordion>
        <div className="d-flex flex-row justify-content-around my-3 align-items-center">
          {" "}
          {e.user_loged ? (
            <Accordion.Toggle
              as={Button}
              variant="outline-success"
              className="rounded-pill"
              eventKey="0"
            >
              <span className="pr-1 font-weight-bold">
                {e.event.comments.length}
              </span>
              {"  "}Comments
            </Accordion.Toggle>
          ) : (
            <Accordion.Toggle
              as={Button}
              variant="outline-success"
              className="rounded-pill"
              eventKey="1"
            >
              <span className="pr-1 font-weight-bold">
                {e.event.comments.length}
              </span>
              {"  "}Comments
            </Accordion.Toggle>
          )}
          {myEvent ? (
            <div className="d-flex align-items-center m-0">
              <Button
                style={{ width: "100px" }}
                onClick={() => history.push(`/edit-event/${params.id}`)}
                variant="link"
                className="d-flex rounded-pill m-0 align-items-center text-black-50"
              >
                {" "}
                <FontAwesomeIcon icon={"edit"} className="pr-2 m-0" size="2x" />
                Edit
              </Button>
            </div>
          ) : (
            <>
              {" "}
              {joined ? (
                <Button
                  style={{ width: "100px" }}
                  onClick={() => leaveEvent(e.event.id)}
                  variant="danger"
                  className="rounded-pill"
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  style={{ width: "100px" }}
                  variant="success"
                  className="rounded-pill"
                  onClick={() => joinEvent(e.event.id)}
                >
                  Join
                </Button>
              )}
            </>
          )}
        </div>
        <hr></hr>

        <Accordion.Collapse eventKey="0">
          <>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className=" p-5 rounded-custom"
            >
              <Form.Group>
                <Form.Label>Stay Connected</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Leave your comment here"
                  className="rounded-lg"
                  as="textarea"
                  rows="3"
                  name="comment"
                  ref={register}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Comment
              </Button>
            </Form>
            {e.event.comments.length > 0 ? (
              <div className="rounded-custom p-3 bg-light my-3">
                {e.event.comments.map(comment => {
                  return (
                    <Media key={comment.id} className="my-3 ">
                      <Image
                        roundedCircle
                        width={50}
                        height={50}
                        className="mr-3"
                        src={
                          comment.user.profile_pic ||
                          "https://us.123rf.com/450wm/steve080/steve0801802/steve080180200287/96083206-social-media-profile-icon-vector-illustration-isolated-on-yellow-background-eps10-.jpg?ver=6"
                        }
                        alt="profile pic"
                      />
                      <Media.Body>
                        <h5>
                          <small className="font-weight-bold">
                            {comment.user.name}
                          </small>{" "}
                          <small className="font-italic text-black-50">
                            <Moment fromNow>{comment.created_at}</Moment>
                          </small>
                        </h5>
                        <p className="border-bottom p-2">{comment.body}</p>
                      </Media.Body>
                    </Media>
                  );
                })}{" "}
              </div>
            ) : (
              <Media className="my-3 py-3 bg-light text-center rounded-custom">
                <Media.Body>
                  <h5>No Comments</h5>
                </Media.Body>
              </Media>
            )}
          </>
        </Accordion.Collapse>

        <Accordion.Collapse eventKey="1">
          <Media>
            <Media.Body className="container-fluid bg-light rounded-custom p-5 text-center my-3">
              <h5 className="text-black-50">
                You have to{" "}
                <Link to="/auth/signin" className="text-decoration-none">
                  Sign In
                </Link>{" "}
                to see the comments.
              </h5>
              <h6 className="text-black-50">
                Not registered yet?{" "}
                <Link to="/auth/signup" className="text-decoration-none">
                  Sign Up!
                </Link>{" "}
              </h6>
            </Media.Body>
          </Media>
        </Accordion.Collapse>
      </Accordion>
    </>
  );
}
