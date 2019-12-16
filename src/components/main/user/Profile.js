import React, { useEffect, useState } from "react";
import { Image, Spinner } from "react-bootstrap";
import Moment from "react-moment";
import useForm from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";

export default function Profile(props) {
  return (
    <>
      {!props.user ? (
        <div className="d-flex vh-100 justify-content-center align-items-center">
          <Spinner animation="border" role="status" variant="success">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="container-fluid bg-light m-0 vh-100 py-5">
          <div className="container bg-white shadow  rounded-custom h-100  d-flex flex-row justify-content-center align-items-center">
            <div className="col-6 text-center border-right">
              <Image
                roundedCircle
                width={150}
                height={150}
                className="mb-3"
                src={
                  props.user.profile_pic ||
                  "https://us.123rf.com/450wm/steve080/steve0801802/steve080180200287/96083206-social-media-profile-icon-vector-illustration-isolated-on-yellow-background-eps10-.jpg?ver=6"
                }
                alt="profile pic"
              ></Image>
              <h4 className="text-secondary">{props.user.name}</h4>
              <h5 className="text-secondary">
                <span>{props.user.last_name || "_"}</span>
              </h5>
              <h5 className="text-secondary">
                <span>{props.user.email || "_"}</span>
              </h5>
              <h5 className="text-secondary">
                <span>{props.user.city || "_"}</span>
              </h5>
              <h5 className="text-secondary">
                <span>{props.user.city || "_"}</span>
              </h5>
            </div>
            <div className="col-6"></div>
          </div>
        </div>
      )}
    </>
  );
}
