import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Recover from "./Recover";
import AboutYou from "./AboutYou";
import SetPw from "./SetPw";

export default function UserAuthentication(props) {
  return (
    <>
      <div className="container-fluid m-0 my-red h-100">
        <Switch>
          <Route
            path="/auth/signin"
            exact
            render={() => <SignIn setUser={props.setUser} user={props.user} />}
          />
          <Route path="/auth/signup" exact component={SignUp} />
          <Route path="/auth/signup/about-you" exact component={AboutYou} />
          <Route path="/auth/recover" exact component={Recover} />
          <Route path="/auth/set-new-pw/:token" component={SetPw} />
        </Switch>
      </div>
    </>
  );
}
