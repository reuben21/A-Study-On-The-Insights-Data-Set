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
    const [setState, State] = React.useState(true);

    const statusOfHuman = sessionStorage.getItem('HumanIsVerified')
    console.log("The Session is", statusOfHuman)
    const url = "http://localhost:8000/success";

    const runFacemesh = async () => {
        // OLD MODEL
        // const net = await facemesh.load({
        //   inputResolution: { width: 640, height: 480 },
        //   scale: 0.8,
        // });
        // NEW MODEL
        const model = await blazeface.load();
        const returnTensors = false;
        // const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
        setInterval(() => {
           return detect(model, returnTensors,640,480);
        }, 10);
    };

    const detect = async (model, returnTensors, width, height) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            // Make Detections
            // OLD MODEL
            //       const face = await net.estimateFaces(video);
            // NEW MODEL
            // const face = await net.estimateFaces({input: video});
            // console.log(face);

            const predictions = await model.estimateFaces(video, returnTensors);
            // console.log(predictions);

            // Get canvas context
            try {
                const context = canvasRef.current.getContext("2d");


            // requestAnimationFrame(()=>{drawMesh(face, ctx)});
            if (predictions.length > 0) {

                setState(true);
                /*
                `predictions` is an array of objects describing each detected face, for example:

                [
                  {
                    topLeft: [232.28, 145.26],
                    bottomRight: [449.75, 308.36],
                    probability: [0.998],
                    landmarks: [
                      [295.13, 177.64], // right eye
                      [382.32, 175.56], // left eye
                      [341.18, 205.03], // nose
                      [345.12, 250.61], // mouth
                      [252.76, 211.37], // right ear
                      [431.20, 204.93] // left ear
                    ]
                  }
                ]
                */

                for (let i = 0; i < predictions.length; i++) {
                    const start = predictions[i].topLeft;
                    const end = predictions[i].bottomRight;
                    var probability = predictions[i].probability;
                    const size = [end[0] - start[0], end[1] - start[1]];
                    // Render a rectangle over each detected face.
                    context.beginPath();
                    context.strokeStyle="green";
                    context.lineWidth = "4";
                    context.rect(start[0], start[1],size[0], size[1]);
                    context.stroke();
                    var prob = (probability[0]*100).toPrecision(5).toString();
                    var text = prob+"%";
                    context.fillStyle = "red";
                    context.font = "13pt sans-serif";
                    context.fillText(text,start[0]+5,start[1]+20);
                }
                // setIsOpen(false);
            }
            }
            catch(err) {
                console.log(err)
            }

        }
    }


    useEffect(() => {
            // if (statusOfHuman === null) {
            //     const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            //         // fetch(url)
            //         //     .then(response => response.json()).then(data => {
            //         //     console.log(data)
            //         //     if (data.Veracity === true) {
            //                 sessionStorage.setItem('HumanIsVerified', true)
            //                 setIsOpen(false);
            //
            //                 clearInterval(intervalId);
            //             // }
            //
            //         // })
            //             // .catch(function (error) {
            //             //     console.log(error)
            //             //
            //             // })
            //     }, 5000)
            // }

            runFacemesh();

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
                    {/*<img style={{*/}
                    {/*    borderRadius: "15px"*/}
                    {/*}} src={'/stream'} className="App-logo" alt="logo"/>*/}
                    <Webcam
                        ref={webcamRef}
                        style={{
                            position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",

                            textAlign: "center",
                            zIndex: 9,
                            width: 640,
                            height: 480,
                        }}
                    />
                    <canvas
                        ref={canvasRef}
                        style={{
                            position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            zIndex: 9,
                            width: 640,
                            height: 480,
                        }}
                    />
                </div>
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


            </Modal>
        </>
    );
};


export default Homepage;