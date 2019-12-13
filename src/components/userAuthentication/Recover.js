import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import useForm from "react-hook-form";
import { Redirect } from "react-router-dom";

export default function Recover(props) {
  const { register, handleSubmit } = useForm();
  const [resetSuccess, setResetSuccess] = useState(false);

  const reset = async data => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/recover`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        setResetSuccess(true);
      } else {
        alert(data.message);
      }
    } else {
      alert("Not allowed to reset password");
    }
  };

  const onSubmit = data => reset(data);

  if (props.user) return <Redirect to="/" />;
  return (
    <>
      {!resetSuccess ? (
        <div className="container d-flex flex-column justify-content-center align-items-center h-100">
          <h3>Reset your Password</h3>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
              className="my-3"
              type="email"
              placeholder="Email"
              name="email"
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            <div className="container-fluid d-flex flex-column p-0 m-0">
              <Button className="my-3" type="submit">
                Reset
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="container d-flex flex-column justify-content-center align-items-center h-100">
          <h3>Great! Now check your email for a password reset link</h3>
        </div>
      )}
    </>
  );
}
