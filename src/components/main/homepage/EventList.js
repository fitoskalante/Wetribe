import React, { useEffect, useState } from "react";
import { CardDeck, Spinner } from "react-bootstrap";
import CardEvent from "./CardEvent";

export default function EventList(props) {
  const [list, setList] = useState([]);

  const getEventList = async () => {
    const res = await fetch("https://localhost:5000/geteventlist");
    const data = await res.json();
    setList(data);
  };

  useEffect(() => {
    getEventList();
  }, []);

  return (
    <>
      <div className="container-fluid py-5 bg-light">
        <div className="container text-center">
          <h1 className="py-3">
            Tribes in{" "}
            <span className="text-info">
              {props.searchedCity || props.currentCity}
            </span>
          </h1>
          <CardDeck>
            {list ? (
              list.map(event => <CardEvent event={event} key={event.id} />)
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
