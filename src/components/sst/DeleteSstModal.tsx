import { useState } from 'react';
import {
    Modal,
    Button,
} from "react-bootstrap";
import ButtonSpinner from '../decoration/ButtonSpinner';
import { SstController } from '../../controllers/SstController';
import { ScheduledServiceType as Sst } from '../../models/ScheduledServiceType';
const CONTROLLER = new SstController();

const DeleteSstModal = (props: {show: boolean, sst: Sst | undefined, onClose: Function, setError: Function}) => {
    const[isLoading, setIsLoading] = useState<boolean>(false);

    const onClose = () => {
        setIsLoading(false);
        props.onClose();
    }

    const onDelete = () => {
        if(props.sst === undefined) {
            return;
        }
        setIsLoading(true);
        CONTROLLER.delete(props.sst.id, onClose, props.setError);
    }

    if(props.sst === undefined) {
        return <div></div>;
    }
    return (
        <Modal show={props.show} onHide={onClose}>
            <Modal.Header closeButton> <Modal.Title> Delete Scheduled Service Type </Modal.Title> </Modal.Header>
            <Modal.Body>
                <div style={{fontSize: "20px"}}> Are you sure you want to delete <strong>{props.sst.serviceName}</strong>?</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" disabled={isLoading} className="shadow-button" onClick={onDelete}>
                    <ButtonSpinner isLoading={isLoading} />
                        Delete 
                </Button>
            </Modal.Footer>
            
        </Modal>
    );
}

export default DeleteSstModal;