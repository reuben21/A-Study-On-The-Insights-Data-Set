import React, { Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import section1 from './images/section1.jpg';
import css from './homepage.module.css';
import section2 from './images/section2.jpg';
import section3 from './images/section3.jpg';


class Home extends Component {
    render() {
        return(
            <div>
                <div style={{
                    padding: 20,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap:"wrap"

                }}>

                    <Grid item xs={12} sm={6} >
                        <Paper style={{
                            height:"300px",
                            borderRadius:"20px",
                            margin:"10px",
                        }}>
                            <img src={section1} className={css.image_css} alt=""/>

                        </Paper>
                        <div style={{
                            display:"flex",
                            justifyContent:"center",
                            alignItems: "flex-start",

                        }}>
                            <h3 className={css.text_css}>
                                Section 1
                            </h3>

                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper style={{
                            height:"300px",
                            borderRadius:"20px",
                            margin:"10px"
                        }}>
                            <img src={section2} className={css.image_css} alt=""/>
                            <div style={{
                                display:"flex",
                                justifyContent:"center",
                                alignItems: "flex-start",

                            }}>
                                <h3 className={css.text_css}>
                                    Section 2
                                </h3>

                            </div>

                        </Paper>
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <Paper style={{
                            height:"300px",
                            borderRadius:"20px",
                            margin:"10px"
                        }}>
                            <img src={section3} className={css.image_css} alt=""/>
                            <div style={{
                                display:"flex",
                                justifyContent:"center",
                                alignItems: "flex-start",

                            }}>
                                <h3 className={css.text_css}>
                                    Section 3
                                </h3>

                            </div>
                        </Paper>
                    </Grid>

                </div>
            </div>
        );
    }
}

export default Home;
