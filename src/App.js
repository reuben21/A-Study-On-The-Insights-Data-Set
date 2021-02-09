import React, {Component} from "react";
import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";


class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <React.Fragment>
            <Navbar  />
            <Switch>
              <Redirect from="/" to="/home" exact/>
              <Route path="/home" component={Homepage}/>

            </Switch>
          </React.Fragment>

        </BrowserRouter>
    );

  }

}

export default App;
