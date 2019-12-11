import React from "react";
import { usePosition } from "./usePosition";
import { GoogleMap, withGoogleMap, Marker } from "react-google-maps";

function Map(props) {
  const position = usePosition();
  return (
    <>
      {!props.pos ? (
        <GoogleMap
          center={{
            lat: parseFloat(position.latitude) || 0,
            lng: parseFloat(position.longitude) || 0
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
          defaultZoom={10}
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
