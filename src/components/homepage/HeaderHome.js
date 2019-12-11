import React from "react";
import illustration from "../../img//illustration.png";

export default function HeaderHome() {
  return (
    <>
      <div
        className="container-fluid d-flex flex-column flex-md-row justify-content-center align-items-center text-dark"
        id="header-home"
      >
        <img
          className="col-xs-12 col-md-5"
          src={illustration}
          alt="ilustration homepage"
        />
        <div className="text-center">
          <h3 className="display-4">Small steps make</h3>
          <h1 className="display-1">Big Changes</h1>
          <button
            type="button"
            className="btn btn-success btn-lg rounded-pill my-5 w-75"
          >
            Join
          </button>
        </div>
      </div>
    </>
  );
}
