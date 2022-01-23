import {
    Container,
    Alert,
    Button
  } from "react-bootstrap";

const ErrorComponent = (props: {title?: string, message?: string, onContinue?: Function}) => {
    return (
        <Container>
            <Alert variant="danger">
                <Alert.Heading> {props.title === undefined ? "An unexpected error occurred" : props.title} </Alert.Heading>
                <p> {props.message === undefined ? "Could not find the error message" : props.message} </p>
                <div className="d-flex justify-content-end">
                    <Button 
                        variant="danger"
                        onClick={() => {
                            if(props.onContinue === undefined) {
                                window.location.pathname = "/";
                            }
                            else {
                                props.onContinue();
                            }
                        }}
                    >
                        Continue
                    </Button>
                </div>
            </Alert>
        </Container>
    );
}

export default ErrorComponent;