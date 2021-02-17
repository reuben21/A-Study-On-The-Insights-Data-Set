import React from 'react';
import CardView from "../../Card/Card";


const Section = (props) => {
    return (
        <>
            <div>
                <CardView question_no_and_text={props.question_no_and_text}
                          question_image={props.question_image}
                          question_text={props.question_text}/>
            </div>
        </>
    );
}

export default Section;