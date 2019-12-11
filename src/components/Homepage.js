import React from "react";
import { CardDeck, Card, CardGroup } from "react-bootstrap";
import EventList from "./homepage/EventList";
import HeaderHome from "./homepage/HeaderHome";

export default function Homepage(props) {
  return (
    <>
      <HeaderHome />
      <EventList currentCity={props.currentCity} />

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

      <div className="categories-div container-fluid py-5 ">
        <div className="container py-5">
          <CardGroup>
            <Card className="bg-dark text-white">
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card>
            <Card className="bg-dark text-white">
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card>
            <Card className="bg-dark text-white">
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card>
            <Card className="bg-dark text-white">
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card>
          </CardGroup>
        </div>
      </div>
    </>
  );
}
