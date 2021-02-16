import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import * as Colors from "../../COLORS";
import PhoneIcon from '@material-ui/icons/Phone';
import Toolbar from "@material-ui/core/Toolbar";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>
                    {children}
                </>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    },
}));

const Sections = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

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
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="red"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    style={{
                        backgroundColor:Colors.DARK_GREENISH

                    }}
                >
                    <Tab style={{
                        padding: 0,
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "25px",
                        color:Colors.DARK_GREENISH,
                        backgroundColor: Colors.WHITE_ISH,
                        // border:"1px solid"+Colors.DARK_GREENISH
                    }} label="Section 1"  {...a11yProps(0)} >
                        <PhoneIcon/>
                    </Tab>
                    <Tab style={{
                        padding: 0,
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "25px",
                          color:Colors.DARK_GREENISH,
                        backgroundColor: Colors.WHITE_ISH
                    }} label="Section 2" {...a11yProps(1)} />
                    <Tab style={{
                        padding: 0,
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "25px",
                          color:Colors.DARK_GREENISH,
                        backgroundColor: Colors.WHITE_ISH
                    }} label="Section 3" {...a11yProps(2)} />

                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    Item Three
                </TabPanel>

            </SwipeableViews>
        </div>
    );
}

export default Sections;