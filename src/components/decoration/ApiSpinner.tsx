import { Spinner } from "react-bootstrap";

const ApiSpinner = (props: {animation: "border" | "grow", textAlign?: "left" | "right" | "center"}) => {
    return (
        <div style={{textAlign: props.textAlign}}>  
            <Spinner 
                as="span"
                animation={props.animation}
                variant="dark"
            />
        </div>
    );
}

export default ApiSpinner;