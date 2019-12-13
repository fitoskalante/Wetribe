import React from "react";
import { Form, Button } from "react-bootstrap";
import useForm from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";

export default function SignUp() {
  const { register, handleSubmit, watch } = useForm();
  const history = useHistory();
  const { token } = useParams();

  const setPw = async data => {
    const res = await fetch(`${process.env.API_URL}/set-new-pw/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        history.push("/signin");
      } else {
        alert(data.message);
      }
    }
  };

  const onSubmit = data => setPw(data);

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center h-100">
        <h3>Confirm your new password</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Control
            className="mt-3"
            type="password"
            placeholder="Password"
            name="password"
            ref={register({ required: true })}
          />
          <Form.Control
            className="mt-3"
            type="password"
            placeholder="Confirm Password"
            name="password2"
            ref={register({
              validate: value => {
                return value === watch("password");
              },
              required: true
            })}
          />
          <Button className="my-3 w-100" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    </>
  );
}
