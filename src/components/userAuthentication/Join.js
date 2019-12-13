import React from "react";
import { Form, Button } from "react-bootstrap";
import useForm from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import logo from "../../img/logo-black.png";

export default function Join() {
  const { register, handleSubmit } = useForm();
  let history = useHistory();

  const signup = async data => {
    const res = await fetch("https://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        history.push("/signin");
      } else {
        alert(data.message);
      }
    }
  };

  const onSubmit = data => signup(data);

  return (
    <>
      <div className=" d-flex flex-row justify-content-center align-items-center vh-100 my-red">
        <div className="container col-12 col-sm-8 col-md-6 col-lg-4 bg-light p-5 rounded-custom text-center">
          <Link to="/">
            <img
              alt="logo"
              src={logo}
              width="150"
              className="d-inline-block align-top "
            />
          </Link>
          <h3>Join the Comunity</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
              className="my-3"
              type="text"
              placeholder="Name"
              name="name"
              ref={register({ required: true, maxLength: 80 })}
            />
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            <Form.Control
              className="mt-3"
              type="password"
              placeholder="Password"
              name="password"
              ref={register({ required: true })}
            />
            <Button className="my-3 w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
