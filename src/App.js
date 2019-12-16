import React, { useState, useEffect } from "react";
import Main from "./components/main/Main";
import UserAuthentication from "./components/userAuthentication/UserAuthentication";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faMapMarkerAlt,
  faUsers,
  faCalendarAlt,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import { usePosition } from "./components/main/map/usePosition";

library.add(fab, faCheckSquare, faMapMarkerAlt, faUsers, faCalendarAlt, faEdit);

function App() {
  const [user, setUser] = useState(null);
  const [currentCity, setCurrentCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const position = usePosition();
  const [myPosition, setMyPosition] = useState("");
  console.log(position, myPosition);
  const getCurrentAddress = async pos => {
    if (!pos.lat && !pos.lng && currentCity !== "") {
      return;
    } else {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/getaddress`, {
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
              ).length !== 0
            ) {
              const getCity = gotLocation.address_components.filter(
                idx => idx.types[0] === "locality"
              )[0].long_name;
              setCurrentCity(getCity);
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
          } else {
            console.log("no results");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const setMyPos = () => {
    if (myPosition) {
      setMyPosition(myPosition);
    } else if (position.latitude) {
      setMyPosition({ lat: position.latitude, lng: position.longitude });
    }
  };

  const logout = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      headers: {
        Authorization: `Token ${sessionStorage.getItem("token")}`
      }
    });
    if (res.ok) {
      sessionStorage.clear("token");
      setUser(null);
    }
  };

  const getUser = async () => {
    const accessToken =
      window.location.search.split("=")[0] === "?api_key"
        ? window.location.search.split("=")[1]
        : null;

    if (!user) {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${accessToken ||
            sessionStorage.getItem("token")}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem("token", data.token);
        setUser(data);
      }
    }
  };

  useEffect(() => {
    getUser();
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  useEffect(() => {
    setMyPos();
    if (position.latitude)
      getCurrentAddress({ lat: position.latitude, lng: position.longitude });
  }, [position.latitude]);

  return (
    <>
      <div id="App">
        <Switch>
          <Route
            path="/auth"
            render={() => <UserAuthentication setUser={setUser} user={user} />}
          />
          <Route
            path="/"
            render={() => (
              <Main
                myPosition={myPosition}
                position={position}
                setUser={setUser}
                user={user}
                currentCity={currentCity}
                setCurrentCity={setCurrentCity}
                searchedCity={searchedCity}
                setSearchedCity={setSearchedCity}
                setMyPosition={setMyPosition}
                logout={() => logout()}
              />
            )}
          />
        </Switch>
      </div>
    </>
  );
}

export default App;
