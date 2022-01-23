import {
    Row,
    Col,
    Form
} from "react-bootstrap";
import { json } from "../../custom_types/json";
import { Car } from "../../models/Car";
import { getUIMetaData } from "../../models/Car";
import { appConstants as CONSTANTS } from '../globals/constants';

const CarForm = (props: {car: Car | undefined, onChangeElement: Function, mode: "edit" | "view"}) => {
    const renderFormElements = (): any => {
        if(props.car === undefined) {
            return <div></div>;
        }
        let carJson: json = props.car as json;
        const formMetaData: json[] = getUIMetaData();
        return (
            <div>
                <Row>
                    {formMetaData.map((metadata: json, index: number) => {
                        let value: string = carJson[metadata.field] === undefined ? "" : carJson[metadata.field].toString();
                        if(metadata.element === CONSTANTS.INPUT || metadata.element === CONSTANTS.TEXTAREA) {                            
                            return (
                                <Col key={metadata.id} md={metadata.col} className="col-spacing">
                                    <Form.Label> {metadata.display} </Form.Label>
                                    <Form.Control 
                                        as={metadata.element}
                                        required={metadata.required}
                                        name={metadata.field}
                                        value={value}
                                        disabled={props.mode === "view"}
                                        onChange={(e) => props.onChangeElement(e, metadata.type)}
                                    />
                                </Col>
                            );
                        }
                        else if(metadata.element === CONSTANTS.SELECT) {
                            return (
                                <Col key={metadata.id} md={metadata.col} className="col-spacing">
                                    <Form.Label> {metadata.display} </Form.Label>
                                    <Form.Select 
                                        required={metadata.required}
                                        name={metadata.field}
                                        value={carJson[metadata.field]}
                                        disabled={props.mode === "view"}
                                        onChange={(e) => props.onChangeElement(e, metadata.type)}
                                    >
                                        <option value=""> Select </option>
                                        {metadata.options.map((optionVal: string, optionIndex: number) => {
                                            return (
                                                <option value={optionVal} key={"car-modal-option-" + metadata.id + optionIndex.toString()}>
                                                    {optionVal}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                </Col>
                            );
                        }
                        else if(metadata.element === CONSTANTS.FILE && props.mode !== "view") {
                            return (
                                <Col key={metadata.id} md={metadata.col} className="col-spacing">
                                    <Form.Label> {metadata.display} </Form.Label>
                                    <Form.Control 
                                        required={metadata.required}
                                        type={metadata.element}
                                    />
                                </Col>
                            );
                        }
                        return (
                            <div key={"metadata-unknown-" + index.toString()}></div>
                        );
                    })}
                </Row>
            </div>
        );
    }

    return (
        <div> {renderFormElements()} </div>
    );
}

export default CarForm;