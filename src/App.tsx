import { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col
} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./components/home/Login";
import ApiSpinner from "./components/decoration/ApiSpinner";
import AppNavbar from "./components/decoration/AppNavbar";
import Home from "./components/home/Home";
import Car from "./components/car/Car";
import NewsPage from './components/NewsPage';
import SstPage from "./components/sst/SstPage";
import ErrorComponent  from './components/decoration/ErrorComponent';
import NotFound from './components/decoration/NotFound';
import { AuthController } from "./controllers/AuthController";
import { json } from './custom_types/json';

import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const[user, setUser] = useState<json>();

  const[isError, setIsError] = useState<boolean>(false);
  const[errTitle, setErrTitle] = useState<string>();
  const[errMsg, setErrMsg] = useState<string>();
  const[errFunc, setErrFunc] = useState<Function>();

  useEffect(() => {
    AuthController.isUserSignedIn(setUser);
  }, [])

  const setError = (error?: any, title?: string, onContinue?: Function) => {
    setIsError(true);
    setErrMsg(error.message);
    setErrTitle(title);
    setErrFunc(onContinue);
  }

  const renderMain = () => {
    if(isError) {
      return (
        <ErrorComponent
          title={errTitle}
          message={errMsg}
          onContinue={errFunc}
        />
      );
    }
    if(user === undefined) {
      return (
        <ApiSpinner animation="grow" textAlign="center" />
      );
    }
    if(user === null) {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      );
    }
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home user={user} setError={setError} />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/sst" element={<SstPage user={user} setError={setError} />} />
          <Route path="/car/:carId" element={<Car user={user} setError={setError} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  }

  return (
    <div>
      <AppNavbar 
        user={user}
      />
      <Container fluid>
        <br/>
        <Row>
          <Col>
            {renderMain()}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
