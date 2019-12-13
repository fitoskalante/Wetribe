import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "./SignIn";
import Join from "./Join";
import Recover from "./Recover";
import SetPw from "./SetPw";

export default function UserAuthentication(props) {
  return (
    <Switch>
      <Route
        path="/auth/signin"
        exact
        render={() => <SignIn setUser={props.setUser} user={props.user} />}
      />
      <Route path="/auth/signup" exact component={Join} />
      <Route path="/auth/recover" exact component={Recover} />
      <Route path="/auth/set-new-pw/:token" component={SetPw} />
    </Switch>
  );
}
