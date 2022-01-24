import {
    Container,
    Row,
    Col,
    Card,
    Button
} from "react-bootstrap";
import { json } from "../../custom_types/json";
import CarService from "./CarService";
import NotFound from "../decoration/NotFound";
import ApiSpinner from "../decoration/ApiSpinner";
import UpcomingMaintenance from "./UpcomingMaintenance";
import CarForm from "./CarForm";
import CarModal from "./CarModal";
import CarSst from "./CarSst";
import CostBreakdown from "./CostBreakdown";

const Car = (props: {user: json, setError: Function}) => {
    const {
        car,
        carModalShow,
        setCarModalShow,
        carId
    } = CarService(props);

    const renderCarInfo = () => {
        let imgSrc: string = (car === undefined || car === null || car.imageUrl.trim().length === 0)
             ? "/car_holder.jpg" 
             : car.imageUrl;
        return (
            <div>
                <Card>
                    <Card.Header> <Card.Title> ℹ️ About </Card.Title> </Card.Header>
                    <Row>
                        <Col style={{textAlign: "right"}}>
                            <Button 
                                style={{margin: "10px"}} 
                                variant="light" 
                                className="auto-hub-button" 
                                onClick={() => setCarModalShow(true)}
                            > 
                                ✏️ 
                            </Button>
                        </Col>
                    </Row>
                    <Card.Body className="home-cards-body">
                        <div style={{textAlign: "center"}}>
                            <Card.Img style={{height: "150px", width: "150px"}} variant="top" src={imgSrc} />
                        </div>
                        <CarForm 
                            car={car}
                            onChangeElement={() => {return}}
                            mode="view"
                        />
                    </Card.Body>
                </Card>
            </div>
        );
    }

    if(car === undefined) {
        return (
            <ApiSpinner animation="border" textAlign="center"/>
        );
    }
    if(car === null || carId === undefined) {
        return (
            <NotFound />
        );
    }
    return (
        <Container>
            <CarModal 
                mode="update"
                user={props.user}
                car={car}
                show={carModalShow}
                onClose={() => setCarModalShow(false)}
                setError={props.setError}
            />
            <Row>
                <Col lg={6} style={{marginBottom: "25px"}}>
                    {renderCarInfo()}
                </Col>
                <Col lg={6} style={{marginBottom: "25px"}}>
                    <Row>
                        <Col lg={12} style={{marginBottom: "25px"}}> <UpcomingMaintenance /> </Col>
                        <Col lg={12} style={{marginBottom: "25px"}}> <CarSst /> </Col>
                        <Col lg={12} style={{marginBottom: "25px"}}> <CostBreakdown /> </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Car;