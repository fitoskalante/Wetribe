import React, { useState } from "react";
import {
  GoogleMap,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { Link } from "react-router-dom";

function Map(props) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const loadedPosition = {
    latitude: 10.7757,
    longitude: 106.7004,
    error: "not loaded"
  };

  return (
    <>
      {!props.pos || props.pos.lat === undefined ? (
        <GoogleMap
          center={
            props.myPosition || {
              lat: parseFloat(loadedPosition.latitude),

              lng: parseFloat(loadedPosition.longitude)
            }
          }
          defaultZoom={11}
        ></GoogleMap>
      ) : (
        <GoogleMap
          center={{
            lat: props.pos.lat,
            lng: props.pos.lng
          }}
          zoom={11}
        >
          {props.pos.lat && !props.markers && (
            <Marker
              draggable={true}
              getClickable={true}
              position={{
                lat: props.pos.lat,
                lng: props.pos.lng
              }}
              icon={{
                url: `/pin-no-location.svg`,
                scaledSize: new window.google.maps.Size(35, 35)
              }}
            />
          )}
          {props.markers &&
            props.markers.map(marker => {
              return (
                <Marker
                  key={marker.id}
                  getClickable={true}
                  onClick={() => setSelectedMarker(marker)}
                  position={marker.position}
                  icon={{
                    url: `/pin.svg`,
                    scaledSize: new window.google.maps.Size(25, 25)
                  }}
                />
              );
            })}
          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h6 className="font-weight-bold">{selectedMarker.title}</h6>
                <hr />
                <Link
                  className="btn btn-outline-success btn-sm rounded-pill"
                  to={"/event/" + selectedMarker.id}
                >
                  more
                </Link>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </>
  );
}

export const WrappedMap = withGoogleMap(Map);
