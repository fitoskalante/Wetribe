import React, { useState, useEffect } from "react";
import SignIn from "./components/SignIn";
import Join from "./components/Join";
import Recover from "./components/Recover";
import Navibar from "./components/Navibar";
import SetPw from "./components/SetPw";
import Homepage from "./components/Homepage";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import EventCreator from "./components/tribes/EventCreator";
import ModalSignOut from "./components/ModalSignOut";
import EventDisplay from "./components/tribes/EventDisplay";
import Foot from "./components/Foot";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { usePosition } from "./components/usePosition";

library.add(fab, faCheckSquare);

function App() {
  const [user, setUser] = useState(null);
  const [currentCity, setCurrentCity] = useState("");
  const [modalSoShow, setModalSoShow] = useState(false);
  const position = usePosition();

  const getCurrentAddress = async pos => {
    if (!pos.lat && !pos.lng && currentCity !== "") {
      return;
    } else {
      const res = await fetch("https://127.0.0.1:5000/getaddress", {
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
              setCurrentCity(getCity + ", " + getRegion);
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
              setCurrentCity(getCity);
            } else {
              const getCity = gotLocation.address_components.filter(
                idx => idx.types[0] === "administrative_area_level_2"
              )[0].long_name;
              setCurrentCity(getCity);
            }
            return;
          } else {
            console.log("no results");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    getUser();
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  useEffect(() => {
    if (position)
      getCurrentAddress({ lat: position.latitude, lng: position.longitude });
  }, [position]);

  const getUser = async () => {
    const accessToken =
      window.location.search.split("=")[0] === "?api_key"
        ? window.location.search.split("=")[1]
        : null;
    const res = await fetch("https://127.0.0.1:5000/getuser", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${accessToken || sessionStorage.getItem("token")}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      sessionStorage.setItem("token", data.token);
      setUser(data);
    }
  };

  return (
    <>
      <ModalSignOut
        show={modalSoShow}
        onHide={() => setModalSoShow(false)}
        setUser={setUser}
      />
      <div id="App">
        <Navibar user={user} setModalSoShow={setModalSoShow} />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Homepage
                setUser={setUser}
                user={user}
                currentCity={currentCity}
              />
            )}
          />
          <Route
            path="/signin"
            exact
            render={() => <SignIn setUser={setUser} user={user} />}
          />
          <Route
            path="/event"
            exact
            render={() => <EventDisplay setUser={setUser} user={user} />}
          />
          <Route path="/signup" exact component={Join} />
          <Route path="/recover" exact component={Recover} />
          <Route path="/set-new-pw/:token" component={SetPw} />
          <Route
            path="/create-event"
            exact
            render={() => <EventCreator setUser={setUser} user={user} />}
          />
        </Switch>
        <Foot />
      </div>
    </>
  );
}

export default App;
