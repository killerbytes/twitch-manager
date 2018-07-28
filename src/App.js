import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Twitch from "./modules/Twitch";
import Twitter from "./modules/Twitter";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/twitch" component={Twitch} />
          <Route path="/twitter" component={Twitter} />
        </Switch>
      </Router>
    );
  }
}
