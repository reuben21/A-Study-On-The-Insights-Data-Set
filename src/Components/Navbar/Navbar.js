import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import ColorButton from '../Button/Button'
// import css from './Navbar.module.css'

class Navbar extends Component {
    state = {}


    render() {

        return (
            <>
                <AppBar position="static" style={{
                    backgroundColor: "#14274e"
                }}>
                    <Toolbar variant="dense" style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "25px",
                        height:"55px",
                        color: "#f1f6f9"
                    }}>

                        Study on The Insights Dataset

                    </Toolbar>



                </AppBar>

            </>
        );
    }
}

export default Navbar;


