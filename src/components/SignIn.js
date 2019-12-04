import React from "react";
import { Form, Button } from "react-bootstrap";
import useForm from "react-hook-form";
import { Redirect } from "react-router-dom";

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
        sessionStorage.setItem("token", data.token); // 100% sure token here is valid
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
      <div className="container d-flex flex-column justify-content-center align-items-center h-100">
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
            <Button className="my-3" type="submit">
              Sign In
            </Button>
            <a href="https://127.0.0.1:5000/login/facebook">LOG IN WITH FB</a>
          </div>
        </Form>
      </div>
    </>
  );
}
