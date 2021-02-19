import React, {useEffect, useState} from 'react';
import Sections from "../Sections/Section";
import Modal from 'react-modal';
import * as Colors from "../../COLORS";
import CircularProgress from '@material-ui/core/CircularProgress';

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

    const [modalIsOpen, setIsOpen] = React.useState(true);
    const [isVerifyLoading, verify] = React.useState(true);
    const [setState, State] = React.useState(true);

    const statusOfHuman = sessionStorage.getItem('HumanIsVerified')
    console.log("The Session is",statusOfHuman)
    const url = "http://localhost:8000/success";
    useEffect(() => {
            if (statusOfHuman===null) {
                const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
                    fetch(url)
                        .then(response => response.json()).then(data => {
                        console.log(data)
                        if (data.Veracity === true) {
                            sessionStorage.setItem('HumanIsVerified', true)
                            setIsOpen(false);

                            clearInterval(intervalId);
                        }

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