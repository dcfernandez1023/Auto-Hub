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
import { ScheduledServiceType as Sst } from '../../models/ScheduledServiceType';
import ButtonSpinner from '../decoration/ButtonSpinner';
import { json } from "../../custom_types/json";
import { newScheduledService, fromJson as scheduledServiceFromJson } from "../../models/ScheduledService";
import { newRepairService, fromJson as repairServiceFromJson } from '../../models/RepairService';
import { Car } from '../../models/Car';
import { JsonMinusNumericLiteral, JsonObjectExpression } from 'typescript';

const Log = (props: {user: json, ssts: Sst[], type: "scheduled" | "repair", log: json[], car: Car, onChangeLog: Function, onSave: Function}) => {
    const[log, setLog] = useState<json[]>([]);
    const[sortBy, setSortBy] = useState<string>("Date");
    const[sortDirection, setSortDirection] = useState<string>("Descending");
    const[isSaved, setIsSaved] = useState<boolean>(true);
    const[isLoading, setIsLoading] = useState<boolean>(false);
    const[show, setShow] = useState<boolean>(false);
    const[newService, setNewService] = useState<json>({});
    const[validated, setValidated] = useState<boolean>(false);

    const SORT_OPTIONS = [
        "Date",
        "Mileage"
    ];

    const formatDate = (timestamp: number): string => {
      var d = new Date(timestamp),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
      return [year, month, day].join('-');
  }

  const sortAsc = (arr: json[], key: string) => {
    arr.sort((a: json, b: json) => {
      return a[key] - b[key];
    });
  }


  const sortDesc = (arr: json[], key: string) => {
    arr.sort((a: json, b: json) => {
      return b[key] - a[key];
    });
  }

  const sortArr = (arr: json[], key: string, direction: string) => {
    if(direction === "Descending") {
      sortDesc(arr, key);
    }
    else if(direction === "Ascending") {
      sortAsc(arr, key);
    }
  }

  const sortLog = (logToSort: json[], direction: string, by: string) => {
    if(by === "Date") {
      sortArr(logToSort, "datePerformed", direction);
    }
    else if(by === "Mileage") {
      sortArr(logToSort, "mileage", direction);
    }
    setLog(logToSort);
  }

    const onChangeLog = (field: string, val: string, type: string, index: number) => {
      setIsSaved(false);
      let logCopy: json[] = log.slice();
      let copy: json = logCopy[index];
      if(type === "string") {
        copy[field] = val;
      }
      else if(type === "number") {
        let reg: RegExp = /^\d+$/;
        if(!reg.test(val) && val.trim().length !== 0) {
            return;
        }
        let parsedInt: number = parseInt(val);
        if(isNaN(parsedInt)) {
            copy[field] = 0;
        }
        else {
            copy[field] = parsedInt;
        }
      }
      else if(type === "date") {
        copy[field] = new Date(val).getTime();
      }
      logCopy[index] = copy;
      setLog(logCopy);
    }

    const onRemoveService = (index: number) => {
      setIsSaved(false);
      let logCopy = log.slice();
      logCopy.splice(index, 1);
      setLog(logCopy);
    }

    const renderScheduledLogTable = () => {
        if(log.length === 0) {
            return (
                <div className="center" style={{fontSize: "20px", marginTop: "50px"}}> Nothing yet... </div>
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
                                <td> 
                                  <Button 
                                    size="sm" 
                                    variant="light"
                                    className="auto-hub-button"
                                    onClick={() => onRemoveService(index)}
                                >
                                  🗑️
                                  </Button> 
                                </td>
                                <td>
                                  {/* date performed */}
                                    <Form.Control
                                        name="datePerformed"
                                        type="date"
                                        value={formatDate(service.datePerformed)}
                                        onChange ={(e) => {
                                          onChangeLog(e.target.name, e.target.value, "date", index);
                                        }}
                                    />
                                </td>
                                <td>
                                  {/* service name */}
                                    <Form.Select 
                                      name="serviceName"
                                      value={service.serviceName}
                                      onChange ={(e) => {
                                        onChangeLog(e.target.name, e.target.value, "string", index);
                                      }}
                                    >
                                      <option value="">Select</option>
                                      {props.ssts.map((sst: Sst) => {
                                        return (
                                          <option value={sst.serviceName}>{sst.serviceName}</option>
                                        );
                                      })}
                                    </Form.Select>
                                </td>
                                <td>
                                  {/* mileage */}
                                  <Form.Control 
                                    name="mileage"
                                    value={service.mileage}
                                    onChange ={(e) => {
                                      onChangeLog(e.target.name, e.target.value, "number", index);
                                    }}
                                  />
                                </td>
                                <td>
                                  {/* next service date */}
                                  <Form.Control 
                                    name="nextServiceDate"
                                    value={service.nextServiceDate}
                                    onChange ={(e) => {
                                      onChangeLog(e.target.name, e.target.value, "number", index);
                                    }} 
                                    disabled={true}
                                  />
                                </td>
                                <td>
                                  {/* next service mileage */}
                                  <Form.Control 
                                    name="nextServiceMileage"
                                    value={service.nextServiceMileage} 
                                    onChange ={(e) => {
                                      onChangeLog(e.target.name, e.target.value, "number", index);
                                    }}
                                    disabled={true}
                                  />
                                </td>
                                <td>
                                  {/* parts cost */}
                                  <Form.Control 
                                    name="partsCost"
                                    value={service.partsCost}
                                    onChange ={(e) => {
                                      onChangeLog(e.target.name, e.target.value, "number", index);
                                    }}
                                  />
                                </td>
                                <td>
                                  {/* labor cost */}
                                  <Form.Control 
                                    name="laborCost"
                                    value={service.laborCost}
                                    onChange ={(e) => {
                                      onChangeLog(e.target.name, e.target.value, "number", index);
                                    }}
                                  />
                                </td>
                                <td>
                                  {/* total cost */}
                                  <Form.Control 
                                    name="totalCost"
                                    value={service.totalCost}
                                    onChange ={(e) => {
                                      onChangeLog(e.target.name, e.target.value, "string", index);
                                    }}
                                  />
                                </td>
                                <td>
                                  {/* notes */}
                                  <Form.Control 
                                    name="notes"
                                    value={service.notes}
                                    onChange ={(e) => {
                                      onChangeLog(e.target.name, e.target.value, "string", index);
                                    }}
                                  />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }

    const renderRepairLogTable = () => {
      if(log.length === 0) {
          return (
              <div className="center" style={{fontSize: "20px", marginTop: "50px"}}> Nothing yet... </div>
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
                              <td> 
                                <Button 
                                  size="sm" 
                                  variant="light"
                                  className="auto-hub-button"
                                  onClick={() => onRemoveService(index)}
                              >
                                🗑️
                                </Button> 
                              </td>
                              <td>
                                {/* date performed */}
                                  <Form.Control
                                      name="datePerformed"
                                      type="date"
                                      value={formatDate(service.datePerformed)}
                                      onChange ={(e) => {
                                        onChangeLog(e.target.name, e.target.value, "date", index);
                                      }}
                                  />
                              </td>
                              <td>
                                {/* service name */}
                                  <Form.Control 
                                    name="serviceName"
                                    value={service.serviceName}
                                    onChange ={(e) => {
                                      onChangeLog(e.target.name, e.target.value, "string", index);
                                    }}
                                  />
                              </td>
                              <td>
                                {/* mileage */}
                                <Form.Control 
                                  name="mileage"
                                  value={service.mileage}
                                  onChange ={(e) => {
                                    onChangeLog(e.target.name, e.target.value, "number", index);
                                  }}
                                />
                              </td>
                              <td>
                                {/* parts cost */}
                                <Form.Control 
                                  name="partsCost"
                                  value={service.partsCost}
                                  onChange ={(e) => {
                                    onChangeLog(e.target.name, e.target.value, "number", index);
                                  }}
                                />
                              </td>
                              <td>
                                {/* labor cost */}
                                <Form.Control 
                                  name="laborCost"
                                  value={service.laborCost}
                                  onChange ={(e) => {
                                    onChangeLog(e.target.name, e.target.value, "number", index);
                                  }}
                                />
                              </td>
                              <td>
                                {/* total cost */}
                                <Form.Control 
                                  name="totalCost"
                                  value={service.totalCost}
                                  onChange ={(e) => {
                                    onChangeLog(e.target.name, e.target.value, "string", index);
                                  }}
                                />
                              </td>
                              <td>
                                {/* notes */}
                                <Form.Control 
                                  name="notes"
                                  value={service.notes}
                                  onChange ={(e) => {
                                    onChangeLog(e.target.name, e.target.value, "string", index);
                                  }}
                                />
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
        return renderRepairLogTable();
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
      onSaveSuccess();
    }

    const onSaveSuccess = () => {
      setIsLoading(false);
      setIsSaved(true);
    }

    const onSaveLog = () => {
      setIsLoading(true);
      let carCopy: json = Object.assign({}, props.car);
      let logCopy = log.slice();
      if(props.type === "scheduled") {
        carCopy.scheduledLog = logCopy;
      }
      else if(props.type === "repair") {
        carCopy.repairLog = logCopy;
      }
      props.onSave(carCopy, onSaveSuccess);
    }

    const onAddNewService = (e: any) => {
      e.preventDefault();
      let copy = Object.assign({}, newService);
      let isValid: boolean = true;
      if(copy.serviceName.trim().length === 0) {
        isValid = false;
      }
      if(copy.datePerformed === 0) {
        isValid = false;
      }
      setNewService(copy);
      setValidated(true);
      if(!isValid) {
        return;
      }
      setIsLoading(true);
      let carCopy = Object.assign({}, props.car);
      if(props.type === "scheduled") {
        carCopy.scheduledLog.push(scheduledServiceFromJson(copy));
      }
      else if(props.type === "repair") {
        carCopy.repairLog.push(repairServiceFromJson(copy));
      }
      props.onSave(carCopy, closeNewServiceModal);
    }

    const onChangeNewService = (field: string, val: string, type: string) => {
      setValidated(false);
      let copy: json = Object.assign({}, newService);
      if(type === "string") {
        copy[field] = val;
      }
      else if(type === "number") {
        let reg: RegExp = /^\d+$/;
        if(!reg.test(val) && val.trim().length !== 0) {
            return;
        }
        let parsedInt: number = parseInt(val);
        if(isNaN(parsedInt)) {
            copy[field] = 0;
        }
        else {
            copy[field] = parsedInt;
        }
      }
      else if(type === "date") {
        copy[field] = new Date(val).getTime();
      }
      setNewService(copy);
    }

    const renderModal = () => {
      const renderInputs = () => {
          return (
            <Row>
              <Col style={{marginBottom: "8px"}} md={6}>
                <Form.Label> Service Name </Form.Label>
                {props.type === "scheduled" ?

                  <Form.Select 
                    name="serviceName"
                    value={newService.serviceName === undefined ? "" : newService.serviceName}
                    onChange={(e: any) => {
                      onChangeNewService(e.target.name, e.target.value, "string");
                    }}
                    required
                  >
                    <option value="">Select</option>
                    {props.ssts.map((sst: Sst) => {
                      return (
                        <option value={sst.serviceName}>{sst.serviceName}</option>
                      );
                    })}
                  </Form.Select>
                  :
                  <Form.Control 
                    name="serviceName"
                    value={newService.serviceName === undefined ? "" : newService.serviceName}
                    onChange={(e: any) => {
                      onChangeNewService(e.target.name, e.target.value, "string");
                    }}
                    required
                  />
                }
              </Col>
              <Col style={{marginBottom: "8px"}} md={6}>
                <Form.Label> Date Performed </Form.Label>
                <Form.Control
                  name="datePerformed"
                  type="date"
                  onChange={(e: any) => {
                    onChangeNewService(e.target.name, e.target.value, "date");
                  }}
                  required
                />
              </Col>
              <Col style={{marginBottom: "8px"}} md={6}>
                <Form.Label> Mileage </Form.Label>
                <Form.Control
                  name="mileage"
                  value={newService.mileage === undefined ? 0 : newService.mileage}
                  onChange={(e: any) => {
                    onChangeNewService(e.target.name, e.target.value, "number");
                  }}
                />
              </Col>
              <Col style={{marginBottom: "8px"}} md={6}>
                <Form.Label> Parts Cost </Form.Label>
                <Form.Control
                  name="partsCost"
                  value={newService.partsCost === undefined ? 0 : newService.partsCost}
                  onChange={(e: any) => {
                    onChangeNewService(e.target.name, e.target.value, "number");
                  }}
                />
              </Col>
              <Col style={{marginBottom: "8px"}} md={6}>
                <Form.Label> Labor Cost </Form.Label>
                <Form.Control
                  name="laborCost"
                  value={newService.laborCost === undefined ? 0 : newService.laborCost}
                  onChange={(e: any) => {
                    onChangeNewService(e.target.name, e.target.value, "number");
                  }}
                />
              </Col>
              <Col style={{marginBottom: "8px"}} md={6}>
                <Form.Label> Total Cost </Form.Label>
                <Form.Control
                  name="totalCost"
                  value={newService.totalCost === undefined ? 0 : newService.totalCost}
                  onChange={(e: any) => {
                    onChangeNewService(e.target.name, e.target.value, "number");
                  }}
                />
              </Col>
              <Col style={{marginBottom: "8px"}} md={12}>
                <Form.Label> Notes </Form.Label>
                <Form.Control
                  name="notes"
                  as="textarea"
                  value={newService.notes === undefined ? "" : newService.notes}
                  onChange={(e: any) => {
                    onChangeNewService(e.target.name, e.target.value, "string");
                  }}
                />
              </Col>
            </Row>
          );
      }

      if(props.type !== "scheduled" && props.type !== "repair") {
        return <div>Unknown</div>;
      }
      renderInputs();

      var onSubmit = onAddNewService;

      return (
        <Modal show={show} onHide={closeNewServiceModal}>
          <Modal.Header closeButton>
            <Modal.Title> New {props.type.charAt(0).toUpperCase() + props.type.slice(1)} Service </Modal.Title>
          </Modal.Header>
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Modal.Body>
              {renderInputs()}
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="success" className="shadow-button" disabled={isLoading}>
                  <ButtonSpinner isLoading={isLoading} />
                  Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      );
    }

    useEffect(() => {
        sortLog(props.log, sortDirection, sortBy);
        console.log("in the Log component");
    }, [props.type, props.log])

    return (
        <div>
            {renderModal()}
            <Row style={{marginBottom: "20px", textAlign: "center"}}>
                <h3> {props.car.name} </h3>
            </Row>
            <Row style={{marginBottom: "20px"}}>
                {/* <Col xs={6} style={{textAlign: "left"}}>
                    <Button variant="light" className="auto-hub-button"> Filters </Button>
                </Col> */}
                  <Col xs={6} style={{textAlign: "left"}}>
                    <InputGroup size="sm" style={{width: "275px"}}>
                        <InputGroup.Text> Sort by </InputGroup.Text>
                        <Form.Select
                            value={sortBy}
                            onChange={(e) => {
                              setSortBy(e.target.value);
                              sortLog(log.slice(), sortDirection, e.target.value);
                            }}
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
                            onChange={(e) => {
                              setSortDirection(e.target.value);
                              sortLog(log.slice(), e.target.value, sortBy);
                            }}
                            style={{width: "35%"}}
                        >
                            <option value="Ascending"> Ascending </option>
                            <option value="Descending"> Descending </option>
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col xs={6} style={{textAlign: "right"}}>
                    <Button variant="success" className="shadow-button" onClick={openNewServiceModal}>
                            +
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} style={{textAlign: "right"}}>
                    <Button variant="success" className="shadow-button" onClick={onSaveLog} disabled={isSaved}>
                            <ButtonSpinner isLoading={isLoading} />
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
