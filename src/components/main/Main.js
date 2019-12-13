import React from "react";
import { Switch, Route } from "react-router-dom";
import Navibar from "./Navibar";
import Homepage from "./Homepage";
import EventDisplay from "./tribes/EventDisplay";
import EventCreator from "./tribes/EventCreator";
import Foot from "./Foot";

export default function ModalSignOut(props) {
  return (
    <>
      <Navibar user={props.user} logout={props.logout} />
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <Homepage
              setUser={props.setUser}
              user={props.user}
              currentCity={props.currentCity}
              setCurrentCity={props.setCurrentCity}
              searchedCity={props.searchedCity}
              setSearchedCity={props.setSearchedCity}
              setMyPosition={props.setMyPosition}
            />
          )}
        />
        <Route
          path={`/event/:id`}
          exact
          render={() => <EventDisplay user={props.user} />}
        />
        <Route
          path="/create-event"
          exact
          render={() => (
            <EventCreator setUser={props.setUser} user={props.user} />
          )}
        />
      </Switch>
      <Foot />
    </>
  );
}
