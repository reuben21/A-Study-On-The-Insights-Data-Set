import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {Bar} from "react-chartjs-2";
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

            datasets: [
                {

                    backgroundColor: this.state.colors,
                    data: this.state.value,
                    borderColor: 'black',
                    barPercentage: 0.5,
                    label: "No. Of Downloads"
                }
            ],
            labels: this.state.key,
        };

        const options = {

            title: {
                display: true,
            },

            legend: {
                display: true,
                position: 'bottom',
                fullWidth: true,
                labels: {
                    fontColor: Colors.DARK_GREENISH,
                    fontFamily: "'Montserrat', sans-serif",
                },


            },
            scales: {
                yAxes: [{
                    gridLines: {
                        color: Colors.DARK_GREENISH,
                    },
                    ticks: {
                        beginAtZero: true,
                        fontColor: Colors.DARK_GREENISH,
                    },
                }],
                xAxes: [{
                    gridLines: {
                        color: Colors.DARK_GREENISH,
                    },
                    ticks: {
                        beginAtZero: true,
                        fontColor: Colors.DARK_GREENISH,
                    },
                }]
            }
        }
        return (
            <>
                <div>
                    <Button component={NavLink} to={"/home"} style={{
                        fontFamily: "'Montserrat', sans-serif",
                        backgroundColor: Colors.MEDIUM_GREENISH,
                        marginTop:"10px",
                        color:Colors.WHITE_ISH
                    }}>Back</Button>
                </div>
                <div>
                    <h1 style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: Colors.DARK_GREENISH
                    }}>Predict the most profitable product that the company must keep manufacturing</h1>
                </div>
                <Bar data={data} options={options}/>
            </>
        );
    }


}

export default QUESTION;