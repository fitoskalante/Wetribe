import React, { useEffect, useState } from "react";
import { CardDeck, Card } from "react-bootstrap";
import EventList from "./homepage/EventList";
import HeaderHome from "./homepage/HeaderHome";
import AutoCompleteCountry from "./map/AutocompleteCountry";
import { WrappedMap } from "../main/map/MapContainer";

export default function Homepage(props) {
  const [citySelected, setCitySelected] = useState(false);
  const [markers, setMarkers] = useState(null);
  const get_events_by_location = async city => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/geteventslocation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(city)
      }
    );
    if (res.ok) {
      const gotEvents = await res.json();
      console.log(gotEvents.events);
      setMarkers(gotEvents.events);
      setCitySelected(false);
    } else {
      console.log("get events failed");
    }
  };

  useEffect(() => {
    get_events_by_location(props.searchedCity);
  }, [citySelected]);

  // useEffect(() => {
  //   get_events_by_location(props.currentCity);
  // }, [props.currentCity]);

  return (
    <>
      <HeaderHome user={props.user} />
      <div className="container-fluid bg-light p-5">
        <div className="container rounded-custom shadow p-5 bg-white text-center">
          <h3>Find Tribes Wherever You Are</h3>
          <AutoCompleteCountry
            setCitySelected={setCitySelected}
            setCurrentCity={props.setCurrentCity}
            currentCity={props.currentCity}
            searchedCity={props.searchedCity}
            setSearchedCity={props.setSearchedCity}
            setMyPosition={props.setMyPosition}
          />
          <div className="w-100">
            <WrappedMap
              markers={markers}
              pos={props.myPosition}
              setPos={props.setPos}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}&language=en`}
              loadingElement={<div />}
              containerElement={<div />}
              mapElement={
                <div style={{ height: "250px" }} className="rounded-custom" />
              }
            />
          </div>
        </div>
      </div>
      <EventList
        currentCity={props.currentCity}
        searchedCity={props.searchedCity}
      />

      <div className="container py-5 bg-white rounded-custom">
        <div className="container text-center">
          <h1 className="py-3">Find the right Tribe for you</h1>
          <CardDeck>
            <Card className="border-0 ">
              <Card.Body className="category-card-local rounded-custom shadow text-center">
                <Card.Title>
                  <h3 className="font-weight-bold text-white">Local Tribes</h3>
                </Card.Title>
                <Card.Text className="text-white">
                  Join a Tribe and start making your community a better place.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="border-0 ">
              <Card.Body className="category-card-nomad rounded-custom shadow text-center">
                <Card.Title className="font-weight-bold text-white">
                  <h3 className="font-weight-bold text-white"> Nomad Tribes</h3>
                </Card.Title>
                <Card.Text className="text-white">
                  Join a community on the go!
                </Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>
        </div>
      </div>
    </>
  );
}
