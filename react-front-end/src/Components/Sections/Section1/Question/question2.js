import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import * as Colors from "../../../../COLORS";
import CircularProgress from "@material-ui/core/CircularProgress";

class QUESTION extends Component {
    state = {
        key: [],
        value: [],
        colors: [],
        loading: true,
    }

    async componentDidMount() {

       const state = await fetch('http://127.0.0.1:8000/section1/question1', {
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
                    value: data.ImageBytes,

                    // colors: data.colors,

                })
                return data;
            }).catch((error) => {
            return error;
        })
        if(state){
             this.setState({
            loading: false
        })
        }

    }


    render() {
        if (this.state.loading) {
            return <CircularProgress style={{
                marginTop:"100px",
                color: Colors.DARK_GREENISH,
            }}/>;
        }
        // isVerifyLoading ?  : <></>


        return (
            <>

                <div>
                    <h1 style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: Colors.DARK_GREENISH
                    }}>Predict the most profitable product that the company must keep manufacturing</h1>
                </div>
                {/*<Bar data={data} options={options}/>*/}
                <img src={"data:image/png;base64," + this.state.value} alt=""/>
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