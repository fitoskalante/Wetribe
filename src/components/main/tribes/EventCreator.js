import React, { useState } from "react";
import {
  Card,
  Button,
  Form,
  FormGroup,
  Col,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";
import { WrappedMap } from "../map/MapContainer";
import AutoCompletePlaces from "../map/AutoCompletePlaces";
import useForm from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Route, useHistory } from "react-router-dom";
import EventDisplay from "./EventDisplay";

export default function EventCreator(props) {
  const { register, handleSubmit } = useForm();
  const [pos, setPos] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState("");
  let history = useHistory();

  const handleChange = val => setCategories(val);

  const getPosIfNotAutocompleted = async address => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/getpos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(address)
    });

    if (res.ok) {
      const gotPos = await res.json();
      console.log(gotPos);
      setPos(gotPos.position);
    } else {
      console.log("getPosIfNotAutocompleted failed");
    }
  };

  const createEvent = async data => {
    setData(data);
    const accessToken =
      window.location.search.split("=")[0] === "?api_key"
        ? window.location.search.split("=")[1]
        : null;

    const res = await fetch(`${process.env.REACT_APP_API_URL}/create-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${accessToken || sessionStorage.getItem("token")}`
      },
      body: JSON.stringify(data)
    });
    console.log("res", data);
    if (res.ok) {
      const response = await res.json();
      if (response.success) {
        setSuccess(true);
        console.log("event created");
        history.push(`/event/${response.event_id}`);
      } else {
        console.log("event created failed");
      }
    } else {
      console.log("error");
    }
  };

  const onSubmit = data => {
    if (pos === "") {
      getPosIfNotAutocompleted(address);
    }
    createEvent({
      ...data,
      pos,
      address,
      city,
      country,
      startTime,
      startDate,
      categories
    });
  };

  // function to prevent defaultValue error in "City" and "Coutry" inputs.
  const handleCitCountChange = () => {
    return;
  };
  if (success)
    return <Route path="/event" render={() => <EventDisplay data={data} />} />;
  return (
    <>
      <div className="container-fluid text-center">
        <h3 className="py-5">Create a Tribe</h3>
        <div className="container d-flex flex-column  mb-5 col-12 col-sm-10 col-md-7">
          <div>
            <Card className="border-0">
              <Card.Body className="rounded-custom shadow">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup className="my-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      name="title"
                      ref={register}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      name="description"
                      placeholder="Describe your event"
                      ref={register}
                    />
                  </FormGroup>
                  <FormGroup className="my-3">
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Image Url"
                      name="image"
                      ref={register}
                    />
                  </FormGroup>
                  <Form.Row>
                    <FormGroup as={Col} className=" d-flex flex-column">
                      <Form.Label>Date</Form.Label>
                      <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        className="form-control"
                      />
                    </FormGroup>

                    <FormGroup as={Col} className=" d-flex flex-column">
                      <Form.Label>Time</Form.Label>
                      <DatePicker
                        selected={startTime}
                        onChange={date => setStartTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="form-control"
                      />
                    </FormGroup>
                  </Form.Row>

                  <div className="w-100 py-1">
                    <WrappedMap
                      pos={pos}
                      myPosition={props.myPosition}
                      setPos={setPos}
                      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}&language=en`}
                      loadingElement={<div />}
                      containerElement={<div />}
                      mapElement={<div style={{ height: "250px" }} />}
                    />
                  </div>
                  <AutoCompletePlaces
                    pos={pos}
                    setPos={setPos}
                    address={address}
                    setAddress={setAddress}
                    setCity={setCity}
                    setCountry={setCountry}
                  />

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        value={city}
                        placeholder="City"
                        onChange={handleCitCountChange}
                        disabled
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCountry">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        value={country}
                        placeholder="Country"
                        onChange={handleCitCountChange}
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Form.Row>

                  <Form.Label>Categories</Form.Label>

                  <ToggleButtonGroup
                    type="checkbox"
                    value={categories}
                    onChange={handleChange}
                    className="d-flex flex-column justify-content-center align-items-center"
                  >
                    <ToggleButton
                      variant="outline-info"
                      className="rounded-pill btn-category btn-sm m-2"
                      value={1}
                    >
                      Environment Protection
                    </ToggleButton>

                    <ToggleButton
                      variant="outline-info"
                      className="rounded-pill btn-category btn-sm m-2"
                      value={2}
                    >
                      Recycling
                    </ToggleButton>

                    <ToggleButton
                      variant="outline-info"
                      className="rounded-pill btn-category btn-sm m-2"
                      value={3}
                    >
                      Volunteering
                    </ToggleButton>

                    <ToggleButton
                      variant="outline-info"
                      className="rounded-pill btn-category btn-sm m-2"
                      value={4}
                    >
                      Education
                    </ToggleButton>
                  </ToggleButtonGroup>

                  <Button
                    type="submit"
                    className="btn btn-success btn-lg rounded-pill my-5 w-75"
                  >
                    Create
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
