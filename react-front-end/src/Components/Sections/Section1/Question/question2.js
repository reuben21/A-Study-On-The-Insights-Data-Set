import React, {Component} from 'react';
import css from './question.module.css'
import * as Colors from "../../../../COLORS";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Button} from "@material-ui/core";
import CssTextField from "../../../Textfield/Textfield"

class QUESTION extends Component {

    constructor(props) {
        super(props);
        this.product = React.createRef();
        this.value_usd = React.createRef();
        this.std_unit_price = React.createRef();
        this.value_in_fc = React.createRef();
        this.unit_rate_in_fc = React.createRef();
        this.unit_rate_currency = React.createRef();
        this.value_inr = React.createRef();
        this.shipment_mode = React.createRef();
        this.qty = React.createRef();
    }

    state = {
        key: [],
        value: [],
        colors: [],
        loading: true,
        product: 0,
        value_usd: 1400,
        std_unit_price: 25,
        value_in_fc: 1200,
        unit_rate_in_fc: 25,
        unit_rate_currency: 1,
        value_inr: 95000,
        shipment_mode: 0,
        qty: 10,
    }

    async componentDidMount() {

        const state = await fetch('http://127.0.0.1:8000/section1/question2', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
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
        if (state) {
            this.setState({
                loading: false
            })
        }

    }

    submitHandler = (event) => {

        event.preventDefault();
        const product = Number(this.product.current.value);
        const value_usd = Number(this.value_usd.current.value);
        const std_unit_price = Number(this.std_unit_price.current.value);
        const value_in_fc = Number(this.value_in_fc.current.value);
        const unit_rate_in_fc = Number(this.unit_rate_in_fc.current.value);
        const unit_rate_currency = Number(this.unit_rate_currency.current.value);
        const value_inr = Number(this.value_inr.current.value);
        const shipment_mode = Number(this.shipment_mode.current.value);
        const qty = Number(this.qty.current.value);

        console.log(JSON.stringify({
            'Product': product,
            'Value(USD)': value_usd,
            'Std Unit Price(USD)': std_unit_price,
            'Value In FC': value_in_fc,
            'Unit Rate In FC': unit_rate_in_fc,
            'Unit Rate Currency': unit_rate_currency,
            'Value(INR)': value_inr,
            'Shipment Mode': shipment_mode,
            'Qty': qty
        }))
        // console.log("lastname " + lastname)
        // console.log("email " + email)
        // console.log("password1 " + password1)
        // console.log("password2 " + password2)
        // console.log("username " + username1)
        // console.log("Phone No " + Phone)
        if (true) {


            fetch('http://localhost:8000/section1/question2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    'Product': [product],
                    'Value(USD)': [value_usd],
                    'Std Unit Price(USD)': [std_unit_price],
                    'Value In FC': [value_in_fc],
                    'Unit Rate In FC': [unit_rate_in_fc],
                    'Unit Rate Currency': [unit_rate_currency],
                    'Value(INR)': [value_inr],
                    'Shipment Mode': [shipment_mode],
                    'Qty': [qty]
                })
            }).then(res => res.json()).then(data => {
                console.log(data)

            }).catch(function (error) {
                console.log(error);
            });
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
                    }}>
                        Use Logistic regression to determine whether Hamburg is a good destination for
                        exporting more than 100 units of any products.
                    </h1>
                </div>
                <form noValidate onSubmit={this.submitHandler}>


                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <div>


                        <CssTextField
                            size={"small"}
                            className={css.textfield}
                            inputRef={this.product}
                            value={this.state.product}
                            label="Product"
                            variant="outlined"
                            id="custom-css-outlined-input"
                        />

                        <CssTextField
                            size={"small"}
                            className={css.textfield}
                            inputRef={this.value_usd}
                            value={this.state.value_usd}

                            label="Value USD"
                            variant="outlined"
                            id="custom-css-outlined-input"
                        />

                        <CssTextField
                            size={"small"}
                            className={css.textfield}
                            inputRef={this.std_unit_price}
                            value={this.state.std_unit_price}

                            label="Standard Unit Price"
                            variant="outlined"
                            id="custom-css-outlined-input"
                        />

                        <CssTextField
                            size={"small"}
                            className={css.textfield}
                            inputRef={this.value_in_fc}
                            value={this.state.value_in_fc}

                            label="Value In FC"
                            variant="outlined"
                            id="custom-css-outlined-input"
                        />

                        <CssTextField
                            size={"small"}
                            className={css.textfield}
                            inputRef={this.unit_rate_in_fc}
                            value={this.state.unit_rate_in_fc}

                            label="Unit Rate in FC"
                            variant="outlined"
                            id="custom-css-outlined-input"
                        />

                        <CssTextField
                            size={"small"}
                            className={css.textfield}
                            inputRef={this.unit_rate_currency}
                            value={this.state.unit_rate_currency}

                            label="Unit Rate Currency"
                            variant="outlined"
                            id="custom-css-outlined-input"
                        />
                        <CssTextField
                            size={"small"}
                            className={css.textfield}
                            inputRef={this.value_inr}
                            value={this.state.value_inr}

                            label="Value (INR)"
                            variant="outlined"
                            id="custom-css-outlined-input"
                        /><CssTextField
                        size={"small"}
                        className={css.textfield}
                        inputRef={this.shipment_mode}
                        value={this.state.shipment_mode}

                        label="Shipment Mode"
                        variant="outlined"
                        id="custom-css-outlined-input"
                    />
                        <CssTextField
                            size={"small"}
                            className={css.textfield}
                            inputRef={this.qty}
                            value={this.state.qty}

                            label="Quantity"
                            variant="outlined"
                            id="custom-css-outlined-input"
                        />
                    </div>
                    <div>
                        <Button type={"submit"} style={{
                            fontFamily: "'Montserrat', sans-serif",
                            backgroundColor: Colors.MEDIUM_GREENISH,
                            marginTop: "10px",
                            color: Colors.WHITE_ISH
                        }}>Submit</Button>
                    </div>
                </div>
                    </form>
                {/*<Bar data={data} options={options}/>*/}
                {/*<img src={"data:image/png;base64," + this.state.value} alt=""/>*/}

            </>
        );
    }


}

export default QUESTION;