import React from "react";
import { Form, Button } from "react-bootstrap";
import useForm from "react-hook-form";
import { Redirect, Link } from "react-router-dom";
import logo from "../../img/logo-black.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SignIn(props) {
  const { register, handleSubmit } = useForm();

  const login = async data => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        props.setUser(data.user);
        sessionStorage.setItem("token", data.token);
      } else {
        sessionStorage.clear("token");
        alert(data.message);
      }
    } else {
      alert("error");
    }
  };

  const onSubmit = data => login(data);

  if (props.user) return <Redirect to="/" />;
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
          <h3 className="border-top mt-3 pt-3">Sign In</h3>

          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="border-bottom mb-3"
          >
            <Form.Control
              className="my-3"
              type="email"
              placeholder="Email"
              name="email"
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              ref={register({ required: true })}
            />
            <div className="container-fluid d-flex flex-column p-0 m-0">
              <Button variant="success" className="my-3" type="submit">
                Sign In
              </Button>
              <Link to="/auth/signup">
                <Button variant="outline-primary w-100" className="mb-3">
                  Sign Up
                </Button>
              </Link>
              <p>
                <small>
                  Forgot your password?{" "}
                  <Link className="menu-item" to="/auth/recover">
                    Click here!
                  </Link>
                </small>
              </p>
            </div>
          </Form>
          <Button
            className="w-100"
            href={`${process.env.REACT_APP_API_URL}/login/facebook`}
          >
            <FontAwesomeIcon
              icon={["fab", "facebook-square"]}
              size="lg"
              className="mr-3"
            />
            LOGIN WITH FB
          </Button>
        </div>
      </div>
    </>
  );
}
