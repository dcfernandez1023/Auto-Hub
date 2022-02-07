import {
    Container,
    Row,
    Col,
    Accordion,
    Table,
    Button
} from "react-bootstrap";
import SstModal from "./SstModal";
import DeleteSstModal from "./DeleteSstModal";
import ApiSpinner from "../decoration/ApiSpinner";
import { json } from "../../custom_types/json";
import SstPageService from "./SstPageService";

const SstPage = (props: {user: json, setError: Function}) => {
    const {
        ssts,
        cars,
        sst,
        setSst,
        showSstModal,
        showDelete,
        setShowDelete,
        mode,
        setMode,
        setShowSstModal,
        getSstDisplayData
    } = SstPageService(props);

    const renderSstTables = () => {
        if(ssts === undefined || cars === undefined) {
            return (
                <ApiSpinner animation="border" textAlign="center"/>
            );
        }
        let displayData: json[] = getSstDisplayData(ssts, cars);
        if(displayData.length === 0) {
            return (
              <div style={{fontSize: "20px", marginTop: "20px"}} className="center"> Nothing yet... </div>  
            );
        }
        return (
            <div>
                <SstModal
                    user={props.user}
                    mode={mode}
                    show={showSstModal}
                    sst={sst}
                    cars={cars}
                    onClose={() => {
                        setSst(undefined);
                        setShowSstModal(false);
                    }}
                    setError={props.setError}
                />
                <DeleteSstModal
                    show={showDelete}
                    sst={sst}
                    onClose={() => {
                        setSst(undefined);
                        setShowDelete(false);
                    }}
                    setError={props.setError}
                />
                <Accordion>
                    {displayData.map((sstData: json, index: number) => {
                        return (
                            <Accordion.Item key={"sst-data-key-" + index.toString()} eventKey={"sst-data-" + index.toString()}>
                                <Accordion.Header> {sstData.sstName} </Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col className="col-spacing" style={{textAlign: "right"}}>
                                            <Button 
                                                variant="light" 
                                                className="auto-hub-button" 
                                                style={{marginRight: "12px"}}
                                                onClick={() => {
                                                    setSst(sstData.sst);
                                                    setMode("edit");
                                                    setShowSstModal(true);
                                                }}
                                            > 
                                                ✏️ 
                                            </Button>
                                            <Button 
                                                variant="light" 
                                                className="auto-hub-button"
                                                onClick={() => {
                                                    setSst(sstData.sst);
                                                    setShowDelete(true);
                                                }}
                                            > 
                                                🗑️ 
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Table borderless>
                                        <thead>
                                            <tr>
                                                <th> Car </th>
                                                <th> Mile Interval </th>
                                                <th> Time Interval </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sstData.carsApplied.map((carApplied: json) => {
                                                return (
                                                    <tr key={"sst-table-row-" + carApplied.carId}>
                                                        <td> {carApplied.carName} </td>        
                                                        <td> {carApplied.mileInterval} </td>
                                                        <td> {carApplied.timeInterval} </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })}
                </Accordion>  
            </div>
        );
    }

    return (
        <Container>
            <br/>
            <Row>
                <Col xs={10}>
                    <h2> Scheduled Service Types </h2>
                </Col>
                <Col xs={2} style={{textAlign: "right"}}>
                    <Button variant="success" className="shadow-button" onClick={() => {
                        // setSst(undefined);
                        //setMode("create");
                        setShowSstModal(true);
                    }}
                    > 
                        + 
                    </Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col> {renderSstTables()} </Col>
            </Row>
        </Container>
    );
}

export default SstPage;