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
    props.setSearchedCity(results[0].formatted_address);
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
          <FormGroup>
            <Form.Control
              className="w-100"
              {...getInputProps({ placeholder: "City ..." })}
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
