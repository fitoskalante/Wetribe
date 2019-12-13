import React from "react";
import { CardDeck, Card } from "react-bootstrap";
import EventList from "./homepage/EventList";
import HeaderHome from "./homepage/HeaderHome";
import AutoCompleteCountry from "./map/AutocompleteCountry";

export default function Homepage(props) {
  return (
    <>
      <HeaderHome />
      <div className="container-fluid bg-warning p-5">
        <div className="container rounded-custom p-5 bg-white">
          <AutoCompleteCountry
            setCurrentCity={props.setCurrentCity}
            currentCity={props.currentCity}
            searchedCity={props.searchedCity}
            setSearchedCity={props.setSearchedCity}
            setMyPosition={props.setMyPosition}
          />
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
