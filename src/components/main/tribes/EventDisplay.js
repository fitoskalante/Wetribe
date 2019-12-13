import React, { useEffect, useState } from "react";
import {
  Media,
  Image,
  Accordion,
  Button,
  Spinner,
  Form
} from "react-bootstrap";
import EventInfo from "./EventInfo";
import Moment from "react-moment";
import useForm from "react-hook-form";
import ModalSignIn from "../modals/ModalSignIn";
import { useParams, useHistory, Link } from "react-router-dom";

export default function EventDisplay(props) {
  const { register, handleSubmit, errors } = useForm();
  const [modalSignInShow, setModalSignInShow] = useState(false);
  const history = useHistory();
  const params = useParams();
  const [e, setE] = useState({ event: { lat: null, lng: null } });
  const [joined, setJoined] = useState(false);

  const onSubmit = data => {
    const id = e.event.id;
    comment({ ...data, id });
  };

  const comment = async data => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const data = await res.json();
      console.log("this is the data", data);
      if (data) {
        console.log(data);
      } else {
        console.log("error joining event");
      }
    }
  };

  const joinEvent = async id => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/joinevent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify(id)
    });
    if (res.ok) {
      const data = await res.json();
      console.log("this is the data", data);
      if (data.joined) {
        setJoined(data.joined);
      } else if (data.notloged) {
        setModalSignInShow(true);
      }
    } else {
      console.log("error joining event");
    }
  };

  const leaveEvent = async id => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/leaveevent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify(id)
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setJoined(data.joined);
    } else {
      console.log("error leaving event");
    }
  };

  const getEventInfo = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/geteventinfo/${params.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`
        }
      }
    );
    const response = await res.json();
    console.log("responseresponse,", response);
    setE(response);
    setJoined(response.attending);
  };

  useEffect(() => {
    getEventInfo();
  }, [joined]);

  return (
    <>
      <ModalSignIn
        show={modalSignInShow}
        onHide={() => setModalSignInShow(false)}
        onClick={() => history.push("/signin")}
      />
      <div className="container-fluid">
        {!e.event.lat ? (
          <Spinner animation="border" role="status" variant="success">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <div className="d-flex flex-column flex-md-row py-5 container">
            <div className="container d-flex flex-column col-12 col-md-8">
              <div className="">
                <Image src={e.event.image_url} fluid />
                <h2 className="mt-3">{e.event.title}</h2>
                <p className="">
                  <Moment fromNow>{e.event.created_at}</Moment> by{" "}
                  <a href="/">{e.user.name}</a>
                </p>

                <p>{e.event.description}</p>
                <hr></hr>
                <Accordion>
                  <div className="d-flex flex-row justify-content-between my-3 align-items-center">
                    {" "}
                    {e.user_loged ? (
                      <Accordion.Toggle
                        as={Button}
                        variant="outline-success"
                        className="rounded-pill"
                        eventKey="0"
                      >
                        Comments
                      </Accordion.Toggle>
                    ) : (
                      <Accordion.Toggle
                        as={Button}
                        variant="outline-success"
                        className="rounded-pill"
                        eventKey="1"
                      >
                        Comments
                      </Accordion.Toggle>
                    )}
                    {e.attending ? (
                      <Button
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
                  </div>
                  <hr></hr>

                  <Accordion.Collapse eventKey="0">
                    <>
                      <Form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-light p-5 rounded-custom"
                      >
                        <Form.Group>
                          <Form.Label>Stay Connected</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="comment"
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
                      <Media>
                        <Image
                          roundedCircle
                          width={64}
                          height={64}
                          className="mr-3"
                          src={
                            e.user.profile_img ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHSYGuMbkmv2fZQ4tdxNiSzsVTNgK_fg5iWsQanic-26hGXW6M_Q&s"
                          }
                          alt="profile pic"
                        />
                        <Media.Body>
                          <h5>Media Heading</h5>
                          <p>
                            Cras sit amet nibh libero, in gravida nulla. Nulla
                            vel metus scelerisque ante sollicitudin commodo.
                            Cras purus odio, vestibulum in vulputate at, tempus
                            viverra turpis. Fusce condimentum nunc ac nisi
                            vulputate fringilla. Donec lacinia congue felis in
                            faucibus.
                          </p>

                          <Media>
                            <Image
                              roundedCircle
                              width={64}
                              height={64}
                              className="mr-3"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHSYGuMbkmv2fZQ4tdxNiSzsVTNgK_fg5iWsQanic-26hGXW6M_Q&s"
                              alt="profile pic"
                            />
                            <Media.Body>
                              <h5>Media Heading</h5>
                              <p>
                                Cras sit amet nibh libero, in gravida nulla.
                                Nulla vel metus scelerisque ante sollicitudin
                                commodo. Cras purus odio, vestibulum in
                                vulputate at, tempus viverra turpis. Fusce
                                condimentum nunc ac nisi vulputate fringilla.
                                Donec lacinia congue felis in faucibus.
                              </p>
                            </Media.Body>
                          </Media>
                        </Media.Body>
                      </Media>
                    </>
                  </Accordion.Collapse>

                  <Accordion.Collapse eventKey="1">
                    <Media>
                      <Media.Body className="container-fluid bg-light rounded-custom p-5 text-center my-3">
                        <h5 className="text-black-50">
                          You have to{" "}
                          <Link
                            to="/auth/signin"
                            className="text-decoration-none"
                          >
                            Sign In
                          </Link>{" "}
                          to see the comments.
                        </h5>
                        <h6 className="text-black-50">
                          Not registered yet?{" "}
                          <Link
                            to="/auth/signup"
                            className="text-decoration-none"
                          >
                            Sign Up!
                          </Link>{" "}
                        </h6>
                      </Media.Body>
                    </Media>
                  </Accordion.Collapse>
                </Accordion>
              </div>
            </div>

            <EventInfo e={e} setPos={props.setPos} />
          </div>
        )}
      </div>
    </>
  );
}
