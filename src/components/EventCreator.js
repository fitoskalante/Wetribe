import React from "react";
import { Card, Button, Form, FormGroup } from "react-bootstrap";

import useForm from "react-hook-form";

export default function Homepage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <>
      <div className="d-flex flex-row">
        <div className="d-flex flex-column justify-content-center align-items-center h-100 ">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Create Event</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup className="my-3">
                  <Form.Label for="title">Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="title"
                    name="title"
                    ref={register}
                  />
                </FormGroup>
                <FormGroup>
                  <Form.Label for="description">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    row="3"
                    name="description"
                    ref={register}
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <Form.Label for="address">Image</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="image"
                    name="image"
                    ref={register}
                  />
                </FormGroup>
                <FormGroup>
                  <Form.Label for="datetime">Date</Form.Label>
                  <Form.Control
                    type="datetime"
                    placeholder="datetime"
                    name="datetime"
                    ref={register}
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <Form.Label for="time">Time</Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="time"
                    name="time"
                    ref={register}
                  />
                </FormGroup>

                <FormGroup>
                  <Form.Label for="address">Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address2"
                    id="address"
                    placeholder="Meeting point"
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <Form.Label for="search">Search</Form.Label>
                  <Form.Control
                    type="search"
                    placeholder="search"
                    name="search"
                    ref={register}
                  />
                </FormGroup>

                <Button className="my-3 w-100" type="submit">
                  Create
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
