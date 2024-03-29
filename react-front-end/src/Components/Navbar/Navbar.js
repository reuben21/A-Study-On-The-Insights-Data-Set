import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import * as Colors from '../../COLORS';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const NavBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{
                backgroundColor: Colors.MEDIUM_GREENISH,
                color: Colors.WHITE_ISH,
            }}>
                <Toolbar style={{
                    // marginTop: "-10px",
                    marginLeft: "20px",
                    display: "flex",
                    justifyContent: "flex-start",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "20px"
                }}>

                    <h3>
                        Project Insights
                    </h3>
                    {/*<Button style={{*/}
                    {/*  backgroundColor: Colors.WHITE_ISH,*/}
                    {/*  color: Colors.DARK_GREENISH*/}
                    {/*}}>Login</Button>*/}
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default NavBar;