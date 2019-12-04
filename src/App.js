import React, { useState, useEffect } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Homepage from "./components/Homepage";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import SideBar from "./components/Sidebar";
import EventCreator from "./components/EventCreator";
import MyVerticallyCenteredModal from "./components/ModalSignIn";

function App() {
  const [user, setUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getUser();
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

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
      <div id="App">
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <SideBar
          pageWrapId={"page-wrap"}
          outerContainerId={"App"}
          user={user}
          setUser={setUser}
          setModalShow={setModalShow}
        />
        <div id="page-wrap">
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route
              path="/signin"
              exact
              render={() => <SignIn setUser={setUser} user={user} />}
            />
            <Route path="/signup" exact component={SignUp} />
            <Route
              path="/create-event"
              exact
              render={() => <EventCreator setUser={setUser} user={user} />}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
