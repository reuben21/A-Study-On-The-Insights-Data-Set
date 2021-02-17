import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import * as Colors from "../../COLORS";
import {NavLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        backgroundColor: Colors.LIGHT_GREENISH,
        color: Colors.DARK_GREENISH,
        margin: 10,
        height: 410,
        fontFamily: "'Montserrat', sans-serif",
    },
    media: {
        height: 200,
        // paddingTop: '56.25%', // 16:9
        width: 375
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const CardView = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <NavLink
              to={props.question_link || "question"}
              style={{
                  textDecoration:"none"
              }}
            >

            <Card className={classes.root}


            >
                <CardHeader

                    title={props.question_no_and_text}
                    // subheader="September 14, 2016"
                />
                <CardMedia
                    className={classes.media}
                    image={props.question_image}
                />
                <CardContent>
                    <Typography component="h4">
                        {props.question_text}
                    </Typography>
                </CardContent>
            </Card>

            </NavLink>
        </>
    );
}

export default CardView;