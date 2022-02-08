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
import { newScheduledService } from "../../models/ScheduledService";
import { newRepairService } from "../../models/RepairService";
import { Car } from '../../models/Car';

const Log = (props: {user: json, type: "scheduled" | "repair", log: json[], car: Car, onChangeLog: Function, onSave: Function}) => {
    const[log, setLog] = useState<json[]>([]);
    const[sortBy, setSortBy] = useState<string>("Date");
    const[sortDirection, setSortDirection] = useState<string>("Ascending");
    const[isSaved, setIsSaved] = useState<boolean>(true);
    const[show, setShow] = useState<boolean>(false);
    const[newService, setNewService] = useState<json>({});

    const SORT_OPTIONS = [
        "Date",
        "Mileage"
    ];

    const renderScheduledLogTable = () => {
        // if(log.length === 0) {
        //     return (
        //         <div className="center" style={{fontSize: "20px"}}> Nothing yet... </div>
        //     );
        // }

        // For testing
        let copy = log.slice();
        copy.push(newScheduledService("test", "test", "test"));
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
                    {copy.map((service, index) => {
                        return (
                            <tr>
                                <td> <Button size="sm" variant="light" className="auto-hub-button">🗑️</Button> </td>
                                <td>
                                  {/* date performed */}
                                    <Form.Control
                                        type="date"
                                    />
                                </td>
                                <td>
                                  {/* service name */}
                                    <Form.Select></Form.Select>
                                </td>
                                <td>
                                  {/* mileage */}
                                  <Form.Control/>
                                </td>
                                <td>
                                  {/* next service date */}
                                  <Form.Control disabled={true}/>
                                </td>
                                <td>
                                  {/* next service mileage */}
                                  <Form.Control disabled={true}/>
                                </td>
                                <td>
                                  {/* parts cost */}
                                  <Form.Control/>
                                </td>
                                <td>
                                  {/* labor cost */}
                                  <Form.Control/>
                                </td>
                                <td>
                                  {/* total cost */}
                                  <Form.Control/>
                                </td>
                                <td>
                                  {/* notes */}
                                  <Form.Control/>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }

    const renderLog = () => {
      if(props.type === "scheduled") {
        return renderScheduledLogTable();
      }
      else if(props.type === "repair") {
        return <div>Repair</div>;
      }
      else {
        return <div>Unknown</div>;
      }
    }

    const openNewServiceModal = () => {
      if(props.type === "scheduled") {
        setNewService(newScheduledService(props.user.email, props.car.id, ""));
        setShow(true);
      }
      else if(props.type === "repair") {
        setNewService(newRepairService(props.user.email, props.car.id));
        setShow(true);
      }
      else {
        setNewService({});
      }
    }

    const closeNewServiceModal = () => {
      setNewService({});
      setShow(false);
    }

    const renderModal = () => {
      const renderScheduledInputs = () => {
          return (
            <Row>
              <Col style={{marginBottom: "8px"}} md={6}>
                <Form.Label> Service Name </Form.Label>
                <Form.Select>
                </Form.Select>
              </Col>
              <Col style={{marginBottom: "8px"}} md={6}>
                <Form.Label> Date Performed </Form.Label>
                <Form.Control
                  type="date"
                />
              </Col>
              <Col style={{marginBottom: "8px"}} md={6}>
                <Form.Label> Mileage </Form.Label>
                <Form.Control
                />
              </Col>
              <Col style={{marginBottom: "8px"}} md={6}>
                <Form.Label> Parts Cost </Form.Label>
                <Form.Control
                />
              </Col>
              <Col style={{marginBottom: "8px"}} md={6}>
                <Form.Label> Labor Cost </Form.Label>
                <Form.Control
                />
              </Col>
              <Col style={{marginBottom: "8px"}} md={6}>
                <Form.Label> Total Cost </Form.Label>
                <Form.Control
                />
              </Col>
            </Row>
          );
      }

      const renderRepairInputs = () => {
        return <div> Repair </div>;
      }

      const renderInputs = () => {
        if(props.type === "scheduled") {
          return renderScheduledInputs();
        }
        else if(props.type === "repair") {
          return renderRepairInputs();
        }
        else {
          return <div> Unknown </div>;
        }
      }

      return (
        <Modal show={show} onHide={closeNewServiceModal}>
          <Modal.Header closeButton>
            <Modal.Title> New {props.type.charAt(0).toUpperCase() + props.type.slice(1)} Service </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {renderInputs()}
          </Modal.Body>
        </Modal>
      );
    }

    useEffect(() => {
        setLog(props.log);
    }, [props.type, props.log])

    return (
        <div>
            {renderModal()}
            <Row style={{marginBottom: "20px", textAlign: "center"}}>
                <h3> {props.car.name} </h3>
            </Row>
            <Row style={{marginBottom: "20px"}}>
                <Col xs={6} style={{textAlign: "left"}}>
                    <Button variant="light" className="auto-hub-button"> Filters </Button>
                </Col>
                <Col xs={6} style={{textAlign: "right"}}>
                    <Button variant="success" className="shadow-button" onClick={openNewServiceModal}>
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
            {renderLog()}
        </div>
    );
}

export default Log;
