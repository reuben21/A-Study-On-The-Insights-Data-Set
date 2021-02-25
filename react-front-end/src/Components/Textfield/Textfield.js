import { colors } from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as Colors from "../../COLORS"
const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: Colors.DARK_GREENISH,
            fontSize: "20px",
            marginTop: "-10px",
            fontFamily: "'Montserrat', sans-serif",
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#1a508b',

        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#1a508b',
                fontSize: "20px",
            },
            '&:hover fieldset': {
                borderColor: '#1a508b',
                color: "#1a508b",
                fontSize: "20px",

                fontFamily: "'Montserrat', sans-serif",
            },
            '&.Mui-focused fieldset': {
                borderColor: '#1a508b',
                color: "white"
            },
        },
        '& .MuiInputBase-input': {
            color: Colors.DARK_GREENISH,
            fontSize: "20px",
            fontFamily: "'Montserrat', sans-serif !important",
        },
        '& .MuiInput-input': {
            color: Colors.DARK_GREENISH,
            fontSize: "20px",
            fontFamily: "'Montserrat', sans-serif",
        },
        '& .MuiFormLabel-root.Mui-disabled': {
            color: Colors.DARK_GREENISH,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "25px",

        },
        '& .MuiInputLabel-root': {
            color: Colors.DARK_GREENISH,
            display: "block",
            transformOrigin: "top left",
        },

    }

})(TextField);

export default CssTextField;