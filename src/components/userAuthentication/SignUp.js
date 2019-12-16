import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import useForm from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import logo from "../../img/logo-black.png";

export default function SignUp() {
  const { register, handleSubmit } = useForm();
  let history = useHistory();

  const signup = async data => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        console.log(data);
        history.push("/auth/signup/about-you", {
          user_id: data.user_id
        });
      } else {
        alert(data.message);
      }
    }
  };

  const onSubmit = data => signup(data);

  return (
    <>
      <div className=" d-flex flex-row justify-content-center align-items-center vh-100 my-red">
        <div className="container col-11 col-sm-8 col-md-6 col-lg-4 bg-light p-5 rounded-custom text-center">
          <Link to="/">
            <img
              alt="logo"
              src={logo}
              width="100"
              className="d-inline-block align-top "
            />
          </Link>
          <h3 className="border-top mt-3 pt-3">Join the Community</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row>
              <Form.Group as={Col} controlId="formName">
                <Form.Control
                  className="mt-3"
                  type="text"
                  placeholder="Name"
                  name="name"
                  ref={register({ required: true, maxLength: 80 })}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formLastName">
                <Form.Control
                  className="mt-3"
                  type="text"
                  placeholder="Lats Name"
                  name="lastname"
                  ref={register({ required: true, maxLength: 80 })}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formCity">
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  ref={register({ required: true, maxLength: 80 })}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formCountry">
                <Form.Control
                  type="text"
                  placeholder="Country"
                  name="country"
                  ref={register({ required: true, maxLength: 80 })}
                />
              </Form.Group>
            </Form.Row>

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
            <p>
              <small>You already have an account? </small>
            </p>
            <Link to="/auth/signin">
              <Button variant="outline-success w-100" className="mb-3">
                Sign In
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    </>
  );
}
