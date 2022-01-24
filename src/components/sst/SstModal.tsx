import {
    Modal,
    Row,
    Col,
    Form,
    Button,
    InputGroup,
    Dropdown
} from "react-bootstrap";
import SstModalService from "./SstModalService";
import ButtonSpinner from "../decoration/ButtonSpinner";
import { json } from "../../custom_types/json";
import { ScheduledServiceType as Sst } from "../../models/ScheduledServiceType";
import { Car } from "../../models/Car";

const SstModal = (props: {user: json, mode: "create" | "edit", show: boolean, sst: Sst | undefined, cars: Car[], onClose: Function, setError: Function}) => {

    const {
        sst,
        validated,
        isLoading,
        onClose,
        onSubmit,
        onChangeServiceName,
        onChangeMileageInterval,
        onChangeTimeQuantity,
        onChangeTimeUnits,
        everyMileage,
        everyTimeQuantity,
        everyTimeUnits,
        onChangeEveryMileage,
        onChangeEveryTimeQuantity,
        onChangeEveryTimeUnits,
        selectedVehicles,
        selectVehicle,
        applyIntervalsToSelectedVehicles
    } = SstModalService(props);

    if(sst === undefined || sst === null) {
        return <div></div>;
    }
    return (
        <Modal show={props.show} size="lg" onHide={onClose} backdrop="static">
            <Modal.Header closeButton> 
                <Modal.Title> {props.mode === "create" ? "Add Scheduled Service Type" : "Edit Scheduled Service Type"} </Modal.Title> 
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Modal.Body>
                    <Row>
                        <Col sm={2}></Col>
                        <Col sm={8}>
                            <Form.Label style={{fontSize: "22px"}}> Service Name </Form.Label>
                            <Form.Control 
                                type="text"
                                required={true}
                                value={sst.serviceName}
                                onChange = {(e) => onChangeServiceName(e)}
                            />
                        </Col>
                        <Col sm={2}></Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs={8}>
                            <h5> Apply Vehicle Intervals </h5>
                        </Col>
                        <Col xs={4} style={{textAlign: "right"}}>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle variant="light" className="auto-hub-button">
                                    Select Vehicles
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{width: "250px"}}>
                                    <Dropdown.Item onClick={() => selectVehicle()}> All Vehicles </Dropdown.Item>
                                    {props.cars.map((car: Car, index: number) => {
                                        return (
                                            <Dropdown.Item key={"apply-to-" + car.id} onClick={() => selectVehicle(car.id)}>
                                                <Row>
                                                    <Col xs={10}>
                                                        {car.name}
                                                    </Col>
                                                    <Col xs={2}>
                                                        {selectedVehicles[car.id] !== undefined ? "✔️" : ""}
                                                    </Col>
                                                </Row>
                                            </Dropdown.Item>
                                        );
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <InputGroup>
                                <span style={{marginRight: "8px", marginTop: "6px"}}>Every</span>
                                <Form.Control 
                                    type="text"
                                    value={everyMileage === 0 ? "" : everyMileage}
                                    style={{marginRight: "8px"}}
                                    onChange={(e) => onChangeEveryMileage(e.target.value)}
                                />
                                <span style={{marginRight: "8px", marginTop: "6px"}}>miles or</span>
                                <Form.Control 
                                    type="text"
                                    value={everyTimeQuantity === 0 ? "" : everyTimeQuantity}
                                    onChange={(e) => onChangeEveryTimeQuantity(e.target.value)}
                                />
                                <Form.Select onChange={(e) => onChangeEveryTimeUnits(e.target.value)} value={everyTimeUnits}>
                                    <option value=""> Select </option>
                                    <option value="day"> Day(s) </option>
                                    <option value="month"> Month(s) </option>
                                    <option value="year"> Year(s) </option>
                                </Form.Select>
                            </InputGroup>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col style={{textAlign: "right"}}>
                            <Button variant="success" className="shadow-button" onClick={applyIntervalsToSelectedVehicles}> Apply </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        {props.cars.map((car: Car, index: number) => {
                            let carScheduled: json = sst.carsScheduled[car.id];
                            return (
                                <Col key={"sst-modal-" + index.toString() + sst.id} md={12} style={{marginBottom: "8px"}}> 
                                    <Row style={{marginBottom: "10px"}}>
                                        <Col>
                                            <span style={{fontSize: "20px"}}> {car.name} </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={4} className="col-spacing">
                                            <Form.Label> Mile Interval </Form.Label>
                                            <Form.Control 
                                                type="text"
                                                required={false}
                                                value={carScheduled === undefined || carScheduled.miles === 0 ? "" : carScheduled.miles}
                                                onChange={(e) => onChangeMileageInterval(car.id, e.target.value)}
                                            />
                                        </Col>
                                        <Col sm={8}>   
                                            <Form.Label> Time Interval </Form.Label> 
                                            <InputGroup>
                                                <Form.Control
                                                    required={carScheduled !== undefined && carScheduled.time.units.trim().length !== 0}
                                                    value={carScheduled === undefined || carScheduled.time.quantity === 0 ? "" : carScheduled.time.quantity}
                                                    onChange={(e) => onChangeTimeQuantity(car.id, e.target.value)}
                                                />
                                                <Form.Select 
                                                    required={carScheduled !== undefined && carScheduled.time.quantity > 0}
                                                    value={carScheduled === undefined ? 0 : carScheduled.time.units} 
                                                    onChange={(e) => onChangeTimeUnits(car.id, e.target.value)}
                                                >
                                                    <option value=""> Select </option>
                                                    <option value="day"> Day(s) </option>
                                                    <option value="month"> Month(s) </option>
                                                    <option value="year"> Year(s) </option>
                                                </Form.Select>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    {index !== props.cars.length-1 ? 
                                        <hr/>
                                    :   
                                        <span></span>
                                    }
                                </Col>
                            );
                        })}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        variant="success" 
                        className="shadow-button"
                    > 
                        <ButtonSpinner isLoading={isLoading} />
                        Done 
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default SstModal;