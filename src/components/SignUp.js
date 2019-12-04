import React from "react";
import { Form, Button } from "react-bootstrap";
import useForm from "react-hook-form";
import { Redirect } from "react-router-dom";

export default function SignUp() {
  const { register, handleSubmit } = useForm();

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
        return <Redirect to={"/signin"} />;
      } else {
        alert(data.message);
      }
    }
  };

  const onSubmit = data => signup(data);

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center h-100">
        <h3>Sign In</h3>
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
    </>
  );
}
