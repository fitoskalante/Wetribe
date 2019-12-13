import React from "react";
import { usePosition } from "./usePosition";
import { GoogleMap, withGoogleMap, Marker } from "react-google-maps";

function Map(props) {
  const position = usePosition();
  const loadedPosition = {
    latitude: 0,
    longitude: 0,
    error: "not loaded"
  };

  return (
    <>
      {!props.pos ? (
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
        </GoogleMap>
      ) : (
        <GoogleMap
          center={{
            lat: parseFloat(props.pos.lat),
            lng: parseFloat(props.pos.lng)
          }}
          defaultZoom={15}
        >
          <Marker
            draggable={true}
            getClickable={true}
            position={{
              lat: parseFloat(props.pos.lat),
              lng: parseFloat(props.pos.lng)
            }}
            error={position.error}
          />
        </GoogleMap>
      )}
    </>
  );
}

export const WrappedMap = withGoogleMap(Map);
