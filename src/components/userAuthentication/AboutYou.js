import React, { useState } from "react";
import {
  Form,
  Button,
  FormGroup,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";
import useForm from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import logo from "../../img/logo-black.png";

export default function AboutYou(props) {
  const { register, handleSubmit } = useForm();
  const [interests, setInterests] = useState([]);
  const user_id = props.location.state;
  const history = useHistory();

  const handleChange = val => setInterests(val);

  const addAbout = async data => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/addaboutyou`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        history.push("/auth/signin");
      } else {
        console.log("error when login");
      }
    } else {
      console.log("error");
    }
  };
  console.log(user_id);
  const onSubmit = data => addAbout({ data, interests, user_id });

  return (
    <>
      <div className=" d-flex flex-row justify-content-center align-items-center  my-red">
        <div className="container col-11 col-sm-10 col-md-8 col-lg-6 bg-light p-5 my-5 rounded-custom text-center">
          <Link to="/">
            <img
              alt="logo"
              src={logo}
              width="100"
              className="d-inline-block align-top "
            />
          </Link>
          <h3 className="border-top mt-3 pt-3">Welcome to the Tribe!</h3>
          <h6>
            Now tell the world about yourself and get connected to amazing
            people like you.
          </h6>

          <Form onSubmit={handleSubmit(onSubmit)} className=" mt-3">
            <FormGroup>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                row="3"
                name="description"
                placeholder="Describe yourself ..."
                ref={register}
              />
            </FormGroup>
            <Form.Label>Interests</Form.Label>

            <ToggleButtonGroup
              type="checkbox"
              value={interests}
              onChange={handleChange}
              className="container d-flex flex-wrap mb-3 w-100 border-bottom pb-3"
            >
              <ToggleButton
                variant="outline-info"
                className="rounded-pill btn-category btn-sm m-2"
                value={1}
              >
                Culture
              </ToggleButton>

              <ToggleButton
                variant="outline-info"
                className="rounded-pill btn-category btn-sm m-2"
                value={2}
              >
                Art
              </ToggleButton>

              <ToggleButton
                variant="outline-info"
                className="rounded-pill btn-category btn-sm m-2"
                value={3}
              >
                Child Protection
              </ToggleButton>

              <ToggleButton
                variant="outline-info"
                className="rounded-pill btn-category btn-sm m-2"
                value={4}
              >
                Reusing
              </ToggleButton>

              <ToggleButton
                variant="outline-info"
                className="rounded-pill btn-category btn-sm m-2"
                value={5}
              >
                Clean Oceans
              </ToggleButton>

              <ToggleButton
                variant="outline-info"
                className="rounded-pill btn-category btn-sm m-2"
                value={6}
              >
                Trees and Plants
              </ToggleButton>

              <ToggleButton
                variant="outline-info"
                className="rounded-pill btn-category btn-sm m-2"
                value={7}
              >
                Wildlife
              </ToggleButton>

              <ToggleButton
                variant="outline-info"
                className="rounded-pill btn-category btn-sm m-2"
                value={8}
              >
                Pure Air
              </ToggleButton>

              <ToggleButton
                variant="outline-info"
                className="rounded-pill btn-category btn-sm m-2"
                value={9}
              >
                Gobal Warming
              </ToggleButton>
              <ToggleButton
                variant="outline-info"
                className="rounded-pill btn-category btn-sm m-2"
                value={10}
              >
                Icebergs
              </ToggleButton>
              <ToggleButton
                variant="outline-info"
                className="rounded-pill btn-category btn-sm m-2"
                value={11}
              >
                Education
              </ToggleButton>
              <ToggleButton
                variant="outline-info"
                className="rounded-pill btn-category btn-sm m-2"
                value={12}
              >
                Sustainable Food
              </ToggleButton>
            </ToggleButtonGroup>

            <Button type="submit" variant="primary w-100" className="mb-3">
              Save
            </Button>

            <Link to="/auth/signin">
              <Button variant="link" className="mb-3">
                Skip
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    </>
  );
}
