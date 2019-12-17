import React from "react";
import { ListGroup, FormGroup, Form } from "react-bootstrap";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default function AutoCompleteCountry(props) {
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    props.setMyPosition(latLng);
    if (results[0].address_components[2].long_name === "Vietnam") {
      props.setSearchedCity(results[0].address_components[1].long_name);
    } else {
      props.setSearchedCity(results[0].address_components[2].long_name);
    }
    props.setCitySelected(true);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={props.searchedCity}
        onChange={props.setSearchedCity}
        onSelect={handleSelect}
        language="en"
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <FormGroup className="w-100 h-100 my-auto mx-0">
            <Form.Control
              className="w-100 h-100"
              {...getInputProps({ placeholder: "City ..." })}
            />
            <ListGroup
              style={{ position: "absolute", zIndex: "999" }}
              variant="flush"
            >
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
