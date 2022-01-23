import {
  Container,
  Row,
  Col,
  Button,
  Figure,
  ListGroup,
  Card
} from "react-bootstrap";
import HomeService from './HomeService';
import UpcomingMaintenance from "../car/UpcomingMaintenance";
import ApiSpinner from '../decoration/ApiSpinner';
import CarModal from '../car/CarModal';
import { json } from '../../custom_types/json';
import { Car } from "../../models/Car";
import NewsWidget from "../car/NewsWidget";

const Home = (props: {user: json, setError: Function}) => {

    const {
        cars,
        showCarModal,
        setShowCarModal,
    } = HomeService(props);

    const renderVehicles = () => {
        return (
            <Card className="home-cards">
                <Card.Header> 
                    <Card.Title> 🚗 Your Vehicles </Card.Title> 
                </Card.Header>
                <Card.Body className="home-cards-body">
                    {cars === undefined ? 
                        <ApiSpinner animation="border" textAlign="center" />
                    :
                        <div>
                            <span style={{float: "right", marginLeft: "8px"}}>
                                <Button variant="light" className="auto-hub-button" onClick={() => setShowCarModal(true)}>
                                        +
                                </Button>
                            </span>
                            {cars.length > 0 ? 
                                <ListGroup variant="flush">
                                    {cars.map((car: Car, index: number): any => {
                                        return (
                                            <ListGroup.Item action onClick={() => window.location.href = "/car/" + car.id}>
                                                <Row>
                                                    <Col xs={8}>
                                                        <div style={{fontSize: "20px"}}> {car.name} </div>
                                                        <small> {car.year} {car.make} {car.model} - {car.mileage} miles </small>
                                                    </Col>
                                                    <Col xs={4} style={{textAlign: "right"}}>
                                                        <img src="/car_holder.jpg" alt="Your Car" style={{width: "65px", height: "65px"}} />                                                        
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        );
                                    })}
                                </ListGroup>
                            :
                                <div style={{textAlign: "center"}}> 
                                    <Figure>
                                        <Figure.Image
                                            width={400}
                                            src="/line_car.jpg"
                                        />
                                        <div style={{marginTop: "15px", fontSize: "20px"}}>
                                            You have not added any vehicles
                                        </div>
                                    </Figure>
                                </div>
                            }
                        </div>
                    }
                </Card.Body>
            </Card>
        );
    }

    return (
        <Container>
            <CarModal 
                mode="create"
                user={props.user}
                car={undefined}
                show={showCarModal}
                onClose={() => setShowCarModal(false)}
                setError={props.setError}
            />
            <br/>
            <Row>
                <Col lg={6} style={{marginBottom: "25px"}}> 
                    {renderVehicles()}
                </Col>
                <Col lg={6} style={{marginBottom: "25px"}}>
                    <UpcomingMaintenance />
                </Col>
            </Row>
            <br/>
            <Row>
                <Col lg={12} style={{marginBottom: "25px"}}>
                    <NewsWidget showFull={false} />
                </Col>
            </Row>
        </Container>
    );
}

export default Home;