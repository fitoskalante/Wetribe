import React from "react";
import { usePosition } from "./usePosition";
import { GoogleMap, withGoogleMap, Marker } from "react-google-maps";

function Map(props) {
  console.log("markers", props.markers);
  const position = usePosition();
  const loadedPosition = {
    latitude: 0,
    longitude: 0,
    error: "not loaded"
  };
  return (
    <>
      {!props.pos || props.pos.lat === undefined ? (
        <GoogleMap
          center={{
            lat:
              parseFloat(position.latitude) ||
              parseFloat(loadedPosition.latitude),
            lng:
              parseFloat(position.longitude) ||
              parseFloat(loadedPosition.longitude)
          }}
          defaultZoom={10}
        >
          <Marker
            getClickable={true}
            position={{
              lat: parseFloat(position.latitude),
              lng: parseFloat(position.longitude)
            }}
            error={position.error}
          />
          {props.markers &&
            props.markers.map(marker => {
              return (
                <Marker
                  key={marker.id}
                  getClickable={true}
                  position={marker.position}
                />
              );
            })}
        </GoogleMap>
      ) : (
        <GoogleMap
          center={{
            lat: props.pos.lat,
            lng: props.pos.lng
          }}
          defaultZoom={16}
        >
          <Marker
            draggable={true}
            getClickable={true}
            position={{
              lat: props.pos.lat,
              lng: props.pos.lng
            }}
            error={position.error}
          />
          {props.markers &&
            props.markers.map(marker => {
              return (
                <Marker
                  key={marker.id}
                  getClickable={true}
                  position={marker.position}
                />
              );
            })}
        </GoogleMap>
      )}
    </>
  );
}

export const WrappedMap = withGoogleMap(Map);
