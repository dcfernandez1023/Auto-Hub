import { useState, useCallback, useEffect } from 'react';
import { CarController } from "../../controllers/CarController";
import { json } from '../../custom_types/json';
import { Car } from '../../models/Car';
const CONTROLLER = new CarController();

const HomeService = (props: {user: json, setError: Function}) => {
    const[cars, setCars] = useState<Car[]>();
    const[showCarModal, setShowCarModal] = useState<boolean>(false);

    const getCars = useCallback(() => {
        CONTROLLER.getAll(props.user.email, setCars, props.setError);
    }, [props.user.email, props.setError])

    useEffect(() => {
        getCars();
        console.log("in home component");
    }, [getCars])

    return {
        cars,
        setCars,
        showCarModal,
        setShowCarModal,
        getCars,
    };
}

export default HomeService;