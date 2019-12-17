import React, { useEffect, useState } from "react";
import { CardDeck, Card, Image, Button } from "react-bootstrap";
import EventList from "./homepage/EventList";
import EventsInLocation from "./homepage/EventsInLocation";
import HeaderHome from "./homepage/HeaderHome";
import AutoCompleteCountry from "./map/AutocompleteCountry";
import { WrappedMap } from "../main/map/MapContainer";
import EnvProt from "../../img/cat1.png";
import Recy from "../../img/cat2.png";
import Volun from "../../img/cat3.png";
import Edu from "../../img/cat4.png";

export default function Homepage(props) {
  const [list, setList] = useState(null);
  const [citySelected, setCitySelected] = useState(false);
  const [markers, setMarkers] = useState([]);
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
      setList(gotEvents.events);
      setCitySelected(false);
    } else {
      console.log("get events failed");
    }
  };

  useEffect(() => {
    get_events_by_location(props.searchedCity);
  }, [citySelected]);

  useEffect(() => {
    if (props.currentCity) {
      get_events_by_location(props.currentCity);
    }
  }, [props.currentCity]);

  return (
    <>
      <HeaderHome user={props.user} />
      <div className="container-fluid bg-white">
        <div className="container text-center">
          <h1 className="py-2 pt-md-5  text-info">
            {props.searchedCity || props.currentCity}
          </h1>
          <div className="container-fluid m-0 d-flex flex-column flex-md-row col-md-7  align-items-center justify-content-center mx-auto py-3">
            <h4 className="col-12 col-md-6 m-0 h-100 py-3 ">
              Search Tribes by City
            </h4>
            <AutoCompleteCountry
              setCitySelected={setCitySelected}
              setCurrentCity={props.setCurrentCity}
              currentCity={props.currentCity}
              searchedCity={props.searchedCity}
              setSearchedCity={props.setSearchedCity}
              setMyPosition={props.setMyPosition}
              className="col-12 col-md-6 m-0 h-100 p-0"
            />
          </div>
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
          <div className="d-flex flex-wrap justify-content-around w-100 py-3">
            <div className="d-flex flex-column align-items-center">
              {" "}
              <Image width={150} height={150} src={EnvProt} alt="categ pic" />
              <Button variant="info" className="rounded-pill font-weight-bold">
                Environment Protection
              </Button>
            </div>
            <div className="d-flex flex-column align-items-center">
              <Image width={150} height={150} src={Recy} alt="categ pic" />
              <Button variant="info" className="rounded-pill font-weight-bold">
                Recycling
              </Button>
            </div>
            <div className="d-flex flex-column align-items-center">
              <Image width={150} height={150} src={Volun} alt="categ pic" />
              <Button variant="info" className="rounded-pill font-weight-bold">
                Volunteering
              </Button>
            </div>
            <div className="d-flex flex-column align-items-center">
              <Image width={150} height={150} src={Edu} alt="categ pic" />

              <Button variant="info" className="rounded-pill font-weight-bold">
                Education
              </Button>
            </div>
          </div>
        </div>
      </div>
      {list ? (
        <EventsInLocation
          list={list}
          currentCity={props.currentCity}
          searchedCity={props.searchedCity}
          markers={props.markers}
        />
      ) : (
        <EventList
          currentCity={props.currentCity}
          searchedCity={props.searchedCity}
          markers={props.markers}
        />
      )}

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
