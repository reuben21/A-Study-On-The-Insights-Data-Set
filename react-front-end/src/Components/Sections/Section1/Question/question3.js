import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import * as Colors from "../../../../COLORS";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';

class QUESTION extends Component {
    state = {
        value1: [],
        value2: [],
        colors: [],
        loading: true,
    }

    async componentDidMount() {

        const state = await fetch('http://127.0.0.1:8000/section1/question3', {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json'
            //     // 'Content-Type': 'application/x-www-form-urlencoded',
            // },
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.setState({
                    // key: data.labels,
                    value1: data.ImageBytes1,
                    value2: data.ImageBytes2,
                    // colors: data.colors,

                })
                return data;
            }).catch((error) => {
                return error;
            })
        if (state) {
            this.setState({
                loading: false
            })
        }

    }


    render() {
        if (this.state.loading) {
            return <CircularProgress style={{
                marginTop: "100px",
                color: Colors.DARK_GREENISH,
            }}/>;
        }
        // isVerifyLoading ?  : <></>


        return (
            <>

                <div>
                    <h1 style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: Colors.DARK_GREENISH,
                        padding: 20
                    }}>Implement linear regression for ‘Quantity’ vs ‘Unit rate in FC‘ .Analyze this model for
                        overfitting and implement a solution using Ridge regression</h1>
                </div>
                {/*<Bar data={data} options={options}/>*/}
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >


                    <h3 style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: Colors.DARK_GREENISH,
                        padding: 20
                    }}>Below Implemented is the Linear Regression</h3>
                    <img src={"data:image/png;base64," + this.state.value1} alt=""/>


                    <h3 style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: Colors.DARK_GREENISH,
                        padding: 20
                    }}>Below Implemented is the Ridge Regression</h3>
                    <img src={"data:image/png;base64," + this.state.value2} alt=""/>
                </Grid>
                <div>
                    <Button component={NavLink} to={"/home"} style={{
                        fontFamily: "'Montserrat', sans-serif",
                        backgroundColor: Colors.MEDIUM_GREENISH,
                        marginTop: "10px",
                        color: Colors.WHITE_ISH
                    }}>Back</Button>
                </div>
            </>
        );
    }


}

export default QUESTION;