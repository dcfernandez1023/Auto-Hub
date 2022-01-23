import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Tabs,
  Tab,
  Figure,
  Spinner
} from "react-bootstrap";
import LoginService from "./LoginService";

const Login = () => {

    const { 
        loginEmail, setLoginEmail, 
        loginPwd, setLoginPwd, 
        registerEmail, setRegisterEmail, 
        registerPwd, setRegisterPwd,
        isLoading,
        onLogin,
        onRegister,
        onGoogleSignin
    } = LoginService();

    return (
        <Container style={{marginTop: "50px"}}>
            <Row>
                <Col lg={6} className="my-auto">
                    <h2> 
                        Monitor the Cost and Maintence of your Vehicles
                    </h2>
                    <br/>
                    <Tabs defaultActiveKey="login" id="login-tabs">
                        {/* Login tab */}
                        <Tab eventKey="login" title="Login">
                            <br/>
                            <Row>
                                <Col md={6} style={{marginBottom: "12px"}}>
                                    <FloatingLabel controlId="login-email" label="Email">
                                        <Form.Control
                                        type="text"
                                        value={loginEmail}
                                        onChange={(e) => {
                                            setLoginEmail(e.target.value);
                                        }}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col md={6} style={{marginBottom: "12px"}}>
                                    <FloatingLabel controlId="login-password" label="Password">
                                        <Form.Control
                                        type="password"
                                        value={loginPwd}
                                        onChange={(e) => {
                                            setLoginPwd(e.target.value);
                                        }}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row style={{marginTop: "8px"}}>
                                <Col style={{textAlign: "center"}}>
                                    <Button variant="light" size="lg" className="login-button" style={{backgroundColor: "#F4F6F7"}} disabled={isLoading} onClick={() => onLogin()}>
                                        {isLoading ?
                                            <Spinner as="span" size="sm" animation="border" style={{marginRight: "8px"}}/>
                                        :
                                            <span></span>
                                        }
                                        Login
                                    </Button>
                                </Col>
                            </Row>
                        </Tab>
                        {/* Register tab */}
                        <Tab eventKey="register" title="Register">
                            <br/>
                            {/* Register email and password Row */}
                            <Row>
                                <Col md={6} style={{marginBottom: "12px"}}>
                                    <FloatingLabel controlId="register-email" label="Email">
                                        <Form.Control
                                        type="text"
                                        value={registerEmail}
                                        onChange={(e) => {
                                            setRegisterEmail(e.target.value);
                                        }}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col md={6} style={{marginBottom: "12px"}}>
                                    <FloatingLabel controlId="register-password" label="Password">
                                        <Form.Control
                                        type="password"
                                        value={registerPwd}
                                        onChange={(e) => {
                                            setRegisterPwd(e.target.value);
                                        }}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row style={{marginTop: "8px"}}>
                                <Col style={{textAlign: "center"}}>
                                <Button variant="light" size="lg" className="login-button" style={{backgroundColor: "#F4F6F7"}} disabled={isLoading} onClick={() => onRegister()}>
                                    {isLoading ?
                                    <Spinner as="span" size="sm" animation="border" style={{marginRight: "8px"}}/>
                                    :
                                    <span></span>
                                    }
                                    Register
                                </Button>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                    <div style={{marginTop: "10px", marginBottom: "10px", textAlign: "center", fontSize: "22px"}}> Or </div>
                    <Row>
                        <Col style={{textAlign: "center"}}>
                            <Button 
                                variant="light"
                                size="lg" 
                                className="login-button" 
                                style={{backgroundColor: "#F4F6F7"}}
                                onClick={onGoogleSignin}
                            >
                                <img src="/google.png" alt="google"/> Sign in with Google
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6} style={{textAlign: "center", marginTop: "30px"}}>
                    <Figure>
                        <Figure.Image
                            width={575}
                            src="/car_landing.jpg"
                        />
                    </Figure>
                </Col>
            </Row>
        </Container>
    ); 
}

export default Login;