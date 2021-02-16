import React from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import NavBar from "./Components/Navbar/Navbar";
import Homepage from "./Components/Homepage/Homepage";

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">*/}

      {/*</header>*/}
       <BrowserRouter>
                    <React.Fragment>
                        {/*<NavBar/>*/}
                        <Switch>
                            <Redirect from="/" to="/home" exact/>
                            <Route path="/home" component={Homepage}/>
                            {/*<Route path="/resume" component={Resume}/>*/}
                            {/*<Route path="/projects" component={Project}/>*/}
                            {/*<Route path="*" component={Page404}/>*/}

                        </Switch>
                    </React.Fragment>

                </BrowserRouter>
    </div>
  );
}

export default App;
