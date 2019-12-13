import React from "react";
import { ListGroup, FormGroup, Form } from "react-bootstrap";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default function AutoCompletePlaces(props) {
  const getAddress = async pos => {
    if (pos) {
      const res = await fetch(`${process.env.API_URL}/getaddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pos)
      });
      if (res.ok) {
        try {
          const gotLocation = await res.json();
          if (gotLocation.address_components) {
            const getCountry = gotLocation.address_components.filter(
              idx => idx.types[0] === "country"
            )[0].long_name;

            if (
              gotLocation.address_components.filter(
                idx => idx.types[0] === "locality"
              ).length !== 0 &&
              gotLocation.address_components.filter(
                idx => idx.types[0] === "administrative_area_level_1"
              ).length !== 0
            ) {
              const getCity = gotLocation.address_components.filter(
                idx => idx.types[0] === "locality"
              )[0].long_name;
              const getRegion = gotLocation.address_components.filter(
                idx => idx.types[0] === "administrative_area_level_1"
              )[0].short_name;
              props.setCity(getCity + ", " + getRegion);
            } else if (
              gotLocation.address_components.filter(
                idx => idx.types[0] === "locality"
              ).length === 0 &&
              gotLocation.address_components.filter(
                idx => idx.types[0] === "administrative_area_level_1"
              ).length !== 0
            ) {
              const getCity = gotLocation.address_components.filter(
                idx => idx.types[0] === "administrative_area_level_1"
              )[0].long_name;
              props.setCity(getCity);
            } else {
              const getCity = gotLocation.address_components.filter(
                idx => idx.types[0] === "administrative_area_level_2"
              )[0].long_name;
              props.setCity(getCity);
            }
            props.setCountry(getCountry);
            props.setAddress(gotLocation.formatted_address);
            return;
          } else {
            alert("no results");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    getAddress(latLng);
    props.setPos(latLng);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={props.address}
        onChange={props.setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <FormGroup>
            <Form.Label>Set the address</Form.Label>
            <Form.Control
              className="w-100"
              {...getInputProps({ placeholder: "Type address" })}
            />
            <ListGroup variant="flush">
              {loading ? <ListGroup.Item>...loading</ListGroup.Item> : null}
              {suggestions.map(suggestion => {
                return (
                  <ListGroup.Item
                    action
                    className="border"
                    {...getSuggestionItemProps(suggestion)}
                  >
                    {suggestion.description}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </FormGroup>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
