import {
    Container,
    Row,
    Col,
    Accordion,
    Table,
    Button
} from "react-bootstrap";
import ApiSpinner from "../decoration/ApiSpinner";
import { json } from "../../custom_types/json";
import SstPageService from "./SstPageService";

const SstPage = (props: {user: json, setError: Function}) => {
    const {
        ssts,
        cars,
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
          <Accordion flush>
              {displayData.map((sstData: json, index: number) => {
                return (
                    <Accordion.Item key={"sst-data-key-" + index.toString()} eventKey={"sst-data-" + index.toString()}>
                        <Accordion.Header> {sstData.sstName} </Accordion.Header>
                        <Accordion.Body>
                            <Table bordered>
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
                    <Button variant="light" className="auto-hub-button"> + </Button>
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