import React, { useEffect } from 'react';
import { Spinner } from "react-bootstrap";

const ButtonSpinner = (props: {isLoading: boolean}) => {
    useEffect(() => {
        console.log("in button spinner component");
    }, [props.isLoading])
    
    return (
        <span>
            {props.isLoading ?
                <Spinner as="span" size="sm" animation="border" style={{marginRight: "8px"}}/>
                :
                <span></span>
            }
        </span>
    );
}

export default ButtonSpinner;