import {
    Modal,
    Button,
    Form
} from "react-bootstrap";
import CarModalService from "./CarModalService";
import ButtonSpinner from "../decoration/ButtonSpinner";
import { json } from '../../custom_types/json';
import { Car } from '../../models/Car';
import CarForm from "./CarForm";

const CarModal = (props: {mode: "create" | "update", user: json, car: Car | undefined, show: boolean, onClose: Function, setError: Function}) => {

    const {
        car,
        validated,
        isLoading,
        onChangeModalElement,
        onModalClose,
        onSubmit,
    } = CarModalService(props);

    return (
        <Modal show={props.show} onHide={onModalClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title> {props.mode === "create" ? "Add Vehicle" : "Edit Vehicle"} </Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Modal.Body>
                    <CarForm 
                        car={car}
                        onChangeElement={onChangeModalElement}
                        mode="edit"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="success" className="shadow-button" disabled={isLoading}>
                        <ButtonSpinner isLoading={isLoading} />
                        Done
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CarModal;