import {
    Card
} from "react-bootstrap";

const UpcomingMaintenance = () => {
    return (
        <Card className="home-cards">
            <Card.Header> <Card.Title> 🛠️ Upcoming Maintenance </Card.Title> </Card.Header>
            <Card.Body className=" center home-cards-body">
                <div style={{fontSize: "20px"}}> Nothing yet... </div>
            </Card.Body>
        </Card>
    );
}

export default UpcomingMaintenance;