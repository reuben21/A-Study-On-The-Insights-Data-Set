import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import { Scatter} from "react-chartjs-2";
import 'chart.piecelabel.js';
import * as Colors from "../../../../COLORS";

class QUESTION extends Component {
    state = {
        key: [],
        value: [],
        colors: []
    }

    componentDidMount() {

        fetch('http://127.0.0.1:8000/section1/question1', {
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
                    key: data.labels,
                    value: data.values,
                    colors: data.colors

                })
                return data;
            }).catch((error) => {
            return error;
        })
    }


    render() {
        const data = {
            datasets: [{
                label: 'Scatter Dataset',
                data: [{
                    x: -10,
                    y: 0
                }, {
                    x: 0,
                    y: 10
                }, {
                    x: 10,
                    y: 5
                }]
            }]
        };

        const options = {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }


        return (

            <>

                <div>
                    <h1 style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: Colors.DARK_GREENISH
                    }
                    }>Predict the most profitable product that the company must keep manufacturing</h1>
                </div>
                <Scatter data={data} options={options}/>
                <div>
                    <Button component={NavLink} to={"/home"} style={{
                        fontFamily: "'Montserrat', sans-serif",
                        backgroundColor: Colors.MEDIUM_GREENISH,
                        marginTop: "10px",
                        color: Colors.WHITE_ISH
                    }}>Back</Button>
                </div>
            </>
        )
            ;
    }


}

export default QUESTION;