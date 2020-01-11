import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Twitch from "./modules/Twitch";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/twitch" component={Twitch} />
          <Redirect path="/" to="/twitch" />
        </Switch>
      </Router>
    );
  }
}
