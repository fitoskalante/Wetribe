import React from "react";
import { Switch, Route } from "react-router-dom";
import Navibar from "./Navibar";
import Homepage from "./Homepage";
import EventDisplay from "./tribes/EventDisplay";
import EventCreator from "./tribes/EventCreator";
import EditEventInfo from "./tribes/EditEventInfo";
import Profile from "./user/Profile";
import Activity from "./user/Activity";
import Privacy from "./homepage/Privacy";
import Foot from "./Foot";

export default function ModalSignOut(props) {
  console.log(props.user);
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
              myPosition={props.myPosition}
              setMyPosition={props.setMyPosition}
            />
          )}
        />
        <Route
          path={`/edit-event/:id`}
          exact
          render={() => <EditEventInfo user={props.user} />}
        />
        <Route path="/privacy" exact render={() => <Privacy />} />
        <Route
          path={`/event/:id`}
          exact
          render={() => <EventDisplay user={props.user} />}
        />
        <Route
          path="/create-event"
          exact
          render={() => (
            <EventCreator
              setUser={props.setUser}
              user={props.user}
              position={props.position}
              myPosition={props.myPosition}
            />
          )}
        />
        <Route
          path={`/profile`}
          exact
          render={() => <Profile user={props.user} />}
        />
        <Route
          path="/activity"
          exact
          render={() => <Activity user={props.user} />}
        />
      </Switch>
      <Foot />
    </>
  );
}
