import React from "react";
import { Form, Button } from "react-bootstrap";
import useForm from "react-hook-form";
import { Redirect, Link } from "react-router-dom";
import logo from "../../img/logo-black.png";
export default function SignIn(props) {
  const { register, handleSubmit } = useForm();

  const login = async data => {
    const res = await fetch("https://127.0.0.1:5000/login", {
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
        <div className="container col-12 col-sm-8 col-md-6 col-lg-4 bg-light p-5 rounded-custom text-center">
          <Link to="/">
            <img
              alt="logo"
              src={logo}
              width="150"
              className="d-inline-block align-top "
            />
          </Link>
          <h3>Sign In</h3>

          <Form onSubmit={handleSubmit(onSubmit)}>
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
              <Button variant="outline-success" className="my-3" type="submit">
                Sign Up
              </Button>
              <a href="https://127.0.0.1:5000/login/facebook">LOG IN WITH FB</a>
            </div>
          </Form>
          <a className="menu-item" href="/recover">
            Forgot your password?
          </a>
          <a className="menu-item" href="/signup">
            Sign Up
          </a>
        </div>
      </div>
    </>
  );
}
