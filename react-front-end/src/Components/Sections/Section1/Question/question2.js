import React from 'react';
import {Button} from "@material-ui/core";
import {NavLink} from "react-router-dom";
// import CardView from "../../Card/Card";


const QUESTION = (props) => {
    return (
        <>
            <div>
                <Button component={NavLink} to={"/home"}>Back</Button>
            </div>
             <div>
                <h1>QUESTION 2</h1>
            </div>
        </>
    );
}

export default QUESTION;