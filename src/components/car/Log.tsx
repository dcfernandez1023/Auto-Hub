import { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Button,
    Table,
    InputGroup,
    Form,
    Modal
} from "react-bootstrap";
import { isGeneratorFunction } from 'util/types';
import { json } from "../../custom_types/json";
import { Car } from '../../models/Car';

const Log = (props: {type: "scheduled" | "repair", log: json[], car: Car, onChangeLog: Function, onSave: Function}) => {
    const[log, setLog] = useState<json[]>([]);
    const[sortBy, setSortBy] = useState("Date");
    const[sortDirection, setSortDirection] = useState("Ascending");
    const[isSaved, setIsSaved] = useState(true);

    const SORT_OPTIONS = [
        "Date",
        "Mileage"
    ];

    const renderScheduledLogTable = () => {
        if(log.length === 0) {
            return (
                <div className="center" style={{fontSize: "20px"}}> Nothing yet... </div>
            );
        }
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date Performed</th>
                        <th>Service Name</th>
                        <th>Mileage</th>
                        <th>Next Service Date</th>
                        <th>Next Service Mileage</th>
                        <th>Parts Cost</th>
                        <th>Labor Cost</th>
                        <th>Total Cost</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {log.map((service, index) => {
                        return (
                            <tr>
                                <td> <Button size="sm" variant="light" className="auto-hub-button">🗑️</Button> </td>
                                <td>
                                    <Form.Control
                                        type="date"
                                    />
                                </td>
                                <td>
                                    <Form.Select></Form.Select>
                                </td>
                                <td>
                                    
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }

    useEffect(() => {
        setLog(props.log);
    }, [props.type, props.log])

    return (
        <div>
            <Row style={{marginBottom: "20px", textAlign: "center"}}>
                <h3> {props.car.name} </h3>
            </Row>
            <Row style={{marginBottom: "20px"}}>
                <Col xs={6} style={{textAlign: "left"}}>
                    <Button variant="light" className="auto-hub-button"> Filters </Button>
                </Col>
                <Col xs={6} style={{textAlign: "right"}}>
                    <Button variant="success" className="shadow-button">
                            +
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs={6} style={{textAlign: "left"}}>
                    <InputGroup size="sm" style={{width: "200px"}}>
                        <InputGroup.Text> Sort by </InputGroup.Text>
                        <Form.Select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{width: "40%"}}
                        >
                            {SORT_OPTIONS.map((sortOption, index) => {
                                let key = sortOption + "-" + index;
                                return (
                                    <option key={key} value={sortOption}> {sortOption} </option>
                                );
                            })}
                        </Form.Select>
                        <Form.Select
                            value={sortDirection}
                            onChange={(e) => setSortDirection(e.target.value)}
                            style={{width: "60%"}}
                        >
                            <option value="Ascending"> Ascending </option>
                            <option value="Descending"> Descending </option>
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col xs={6} style={{textAlign: "right"}}>
                    <Button variant="success" className="shadow-button" disabled={isSaved}>
                            Save
                    </Button>
                </Col>
            </Row>
            <br/>
        </div>
    );
}

export default Log;