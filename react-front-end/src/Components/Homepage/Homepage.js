import React, {useEffect, useState, useRef} from 'react';
import Sections from "../Sections/Section";
import Modal from 'react-modal';
import * as Colors from "../../COLORS";
import CircularProgress from '@material-ui/core/CircularProgress';
import * as tf from "@tensorflow/tfjs";
// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";

// NEW MODEL
import * as blazeface from "@tensorflow-models/blazeface";
import Webcam from "react-webcam";
import {drawMesh} from "./utilities";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "500px",
        height: "500px",
        backgroundColor: Colors.DARK_GREENISH,
        borderRadius: "20px"
    }

};


const Homepage = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const [modalIsOpen, setIsOpen] = React.useState(true);
    const [isVerifyLoading, verify] = React.useState(true);
    const [state, setState] = React.useState(false);

    const statusOfHuman = sessionStorage.getItem('HumanIsVerified')
    console.log("The Session is", statusOfHuman)
    const url = "http://localhost:8000/success";


    useEffect(() => {
        const statusOfHuman = sessionStorage.getItem('HumanIsVerified')
        console.log("The Session is", statusOfHuman)
        const url = "http://localhost:8000/success";
                if (statusOfHuman === null) {
                    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
                        fetch(url)
                            .then(response => response.json()).then(data => {
                            console.log(data)
                            if (data.Veracity === true) {
                                sessionStorage.setItem('HumanIsVerified', true)
                                // setIsOpen(false);

                                clearInterval(intervalId);
                            }


                        })
                            .catch(function (error) {
                                console.log(error)

                            })
                            .catch(function (error) {
                                console.log(error)
                            })
                    }, 5000)
                }

                //This is important

            },
            [url, useState]
        )


        return (
            <>
                <Sections/>
                <Modal
                    isOpen={modalIsOpen && !statusOfHuman}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    {/*<button onClick={closeModal}>close</button>*/}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: "25px",
                            color: Colors.WHITE_ISH,
                            flexDirection: "row"
                        }}
                    >
                        We Need To See If Your A Human

                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: "25px",
                            color: Colors.WHITE_ISH,
                            flexDirection: "row",
                            marginTop: "20px"
                        }}
                    >
                        <img style={{
                            borderRadius: "15px"
                        }} src={'/stream'} className="App-logo" alt="logo"/>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: "25px",
                                color: Colors.WHITE_ISH,
                                flexDirection: "row",
                                marginTop: "30px"
                            }}
                        >
                            {isVerifyLoading ? <CircularProgress style={{
                                color: Colors.WHITE_ISH,
                            }}/> : <></>

                            }

                        </div>
                    </div>

                </Modal>
            </>
        );
    }


    export default Homepage
