import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import NavBar from "./Components/Navbar/Navbar";
import Homepage from "./Components/Homepage/Homepage";
import question1 from "./Components/Sections/Section1/Question/question1";
import question2 from "./Components/Sections/Section1/Question/question2";
import question3 from "./Components/Sections/Section1/Question/question3";
import question4 from "./Components/Sections/Section1/Question/question4";

function App() {
    return (
        <div className="App">
            {/*<header className="App-header">*/}

            {/*</header>*/}
            <Router>
                <React.Fragment>
                    <NavBar/>
                    <Switch>
                        <Redirect from="/" to="/home" exact/>
                        <Route path="/home" component={Homepage}/>
                        <Route path="/section1/question1" component={question1}/>
                        <Route path="/section1/question2" component={question2}/>
                        <Route path="/section1/question3" component={question3}/>
                        <Route path="/section1/question4" component={question4}/>
                        {/*<Route path="/projects" component={Project}/>*/}
                        {/*<Route path="*" component={Page404}/>*/}

                    </Switch>
                </React.Fragment>

            </Router>
        </div>
    );
}

export default App;
