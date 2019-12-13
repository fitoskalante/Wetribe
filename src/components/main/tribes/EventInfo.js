import React from "react";

import { WrappedMap } from "../map/MapContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EventInfo(props) {
  return (
    <>
      <div className="col-12 col-md-4">
        <div className="p-3 bg-light rounded-custom mb-3">
          <h4 className="font-italic">Tribe</h4>
          <p className="text-black-50 m-0 d-flex py-2">
            <FontAwesomeIcon icon={"users"} className="pr-3" size="2x" />{" "}
            {props.e.attendance} Members
          </p>

          <p className="text-black-50 m-0 d-flex  py-2">
            <FontAwesomeIcon icon={"calendar-alt"} className="pr-3" size="3x" />{" "}
            {props.e.event.date}
          </p>

          <p className="text-black-50 m-0 d-flex  py-2">
            <FontAwesomeIcon
              icon={"map-marker-alt"}
              className="pr-3"
              size="3x"
            />{" "}
            {props.e.event.address}
          </p>
        </div>

        <div className="w-100">
          <WrappedMap
            pos={props.e.event.position}
            setPos={props.setPos}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div />}
            containerElement={<div />}
            mapElement={
              <div style={{ height: "250px" }} className="rounded-custom" />
            }
          />
        </div>
      </div>
    </>
  );
}
