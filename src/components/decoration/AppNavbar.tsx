import {
  Container,
  Row,
  Col,
  ListGroup,
  Navbar,
  Nav,
  Dropdown,
  Button,
} from 'react-bootstrap';
import { json } from '../../custom_types/json';
import { AuthController } from "../../controllers/AuthController";

const AppNavbar = (props: {user: undefined | null | json}) => {
  return (
    <Navbar className="navbar-linear" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          AutoHub
        </Navbar.Brand>
        {props.user !== undefined && props.user !== null ?
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/forum">Forum</Nav.Link>
            <Nav.Link href="/news">News</Nav.Link>
          </Nav>
        :
          <span></span>
        }
        <Nav className="mr-auto">
        </Nav>
        {props.user !== undefined && props.user !== null ?
          <Nav>
            <Button variant="light" onClick={() => window.location.href="/sst"} style={{marginRight: "8px"}}> 🛎️ </Button>
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                style={{margin: "1%", float: "right"}}
                className="nav-profile nav-profile-menu"
              >
                👤
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" style={{border: "1px solid gray"}}>
                <Row>
                  <Col>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col xs ={12} style = {{textAlign: "center"}}>
                            Signed in as:
                          </Col>
                        </Row>
                        <Row>
                          <Col style = {{textAlign: "center"}}>
                            <strong> {props.user === undefined || props.user === null ? "" : props.user.email} </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item action onClick={() => AuthController.signout()}>
                        Signout
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          :
          <Nav></Nav>
        }
      </Container>
    </Navbar>
  );
}

export default AppNavbar;