import React, { useEffect, useState } from "react";
import { Image, Spinner, Badge } from "react-bootstrap";
import EventInfo from "./EventInfo";
import Moment from "react-moment";
import useForm from "react-hook-form";
import ModalSignIn from "../modals/ModalSignIn";
import { useParams, useHistory } from "react-router-dom";
import CommentsEvent from "./CommentsEvent";
import { Link } from "react-router-dom";

export default function EventDisplay(props) {
  const { register, handleSubmit } = useForm();
  const [modalSignInShow, setModalSignInShow] = useState(false);
  const history = useHistory();
  const params = useParams();
  const [e, setE] = useState({ event: { lat: null, lng: null } });
  const [joined, setJoined] = useState(false);
  const [myEvent, setMyEvent] = useState(false);

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
      if (data.success) {
        getEventInfo();
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
    setMyEvent(response.my_event);
    setE(response);
    setJoined(response.attending);
  };

  useEffect(() => {
    getEventInfo();
  }, []);

  return (
    <>
      <ModalSignIn
        show={modalSignInShow}
        onHide={() => setModalSignInShow(false)}
        onClick={() => history.push("/signin")}
      />

      <div className="container-fluid">
        {!e.event.lat ? (
          <div className="d-flex vh-100 justify-content-center align-items-center">
            <Spinner animation="border" role="status" variant="success">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="d-flex flex-column flex-md-row py-5 container">
            <div className="container d-flex flex-column col-12 col-md-8">
              <div className="">
                <Image src={e.event.image_url} fluid />
                <h3 className="mt-3 text-truncate">{e.event.title}</h3>
                <p className="">
                  <Moment fromNow>{e.event.created_at}</Moment> by{" "}
                  <Link to={"/profile/" + e.event.creator.id}>
                    {e.event.creator.name}
                  </Link>
                </p>

                <p>{e.event.description}</p>
                {e.event.categories.length > 0 ? (
                  e.event.categories.map(categ => {
                    return (
                      <h5 key={categ.id}>
                        <Badge variant="info">{categ.name}</Badge>
                      </h5>
                    );
                  })
                ) : (
                  <p>
                    <small className="text-black-50">No Categories</small>
                  </p>
                )}
                <hr></hr>
                <CommentsEvent
                  e={e}
                  leaveEvent={leaveEvent}
                  joined={joined}
                  joinEvent={joinEvent}
                  onSubmit={onSubmit}
                  register={register}
                  handleSubmit={handleSubmit}
                  myEvent={myEvent}
                />
              </div>
            </div>
            <EventInfo
              e={e}
              setPos={props.setPos}
              user={props.user}
              myEvent={myEvent}
            />
          </div>
        )}
      </div>
    </>
  );
}
