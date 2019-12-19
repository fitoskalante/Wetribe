import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  FormGroup,
  Col,
  ToggleButtonGroup,
  Spinner,
  ToggleButton
} from "react-bootstrap";
import { WrappedMap } from "../map/MapContainer";
import AutoCompletePlaces from "../map/AutoCompletePlaces";
import useForm from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useParams } from "react-router-dom";

export default function EditEventInfo() {
  const [e, setE] = useState("");
  const { register, handleSubmit } = useForm();
  const [pos, setPos] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const params = useParams();

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
    setE(response);
    setPos(response.event.position);
    setAddress(response.event.address);
    setCity(response.event.city);
    setCountry(response.event.country);
  };

  const handleChange = val => setCategories(val);

  const onSubmit = data => {
    const id = e.event.id;
    editEvent({
      ...data,
      pos,
      address,
      city,
      country,
      startTime,
      startDate,
      categories,
      id
    });
    history.push(`/event/${params.id}`);
    getEventInfo();
  };

  const editEvent = async data => {
    console.log(data);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/edit-event`, {
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
        console.log("okokokoko");
      } else {
        console.log("error editing event");
      }
    } else {
      console.log("error");
    }
  };
  // function to prevent defaultValue error in "City" and "Coutry" inputs.
  const handleCitCountChange = () => {
    return;
  };

  useEffect(() => {
    getEventInfo();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!e)
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <Spinner animation="border" role="status" variant="success">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  return (
    <>
      <div className="container-fluid text-center">
        <h3 className="py-5">Edit your Tribe</h3>
        <div className="container d-flex flex-column  mb-5 col-12 col-sm-10 col-md-7">
          <div>
            <Card className="border-0">
              <Card.Body className="rounded-custom shadow">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup className="my-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      defaultValue={e.event.title}
                      type="text"
                      placeholder="Title"
                      name="title"
                      ref={register}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      defaultValue={e.event.description}
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
                      defaultValue={e.event.image_url}
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
                    address={e.event.address}
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
                  <div className="d-flex flex-column flex-md-row justify-content-center align-items-center border-top mt-3 pb-5">
                    <Button
                      style={{ width: "200px" }}
                      className="rounded-pill mt-3 mr-0 mr-md-2 "
                      variant="outline-danger"
                      onClick={() => history.push(`/event/${e.event.id}`)}
                    >
                      Dismiss
                    </Button>

                    <Button
                      style={{ width: "200px" }}
                      type="submit"
                      variant="success"
                      className="rounded-pill mt-3 ml-0 ml-md-2"
                    >
                      Confirm Changes
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
