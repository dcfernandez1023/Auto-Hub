import { useState, useEffect, useCallback } from 'react';
import { CarController } from '../../controllers/CarController';
import { json } from '../../custom_types/json';
import { Car } from "../../models/Car";
import { useParams } from "react-router-dom";
const CONTROLLER: CarController = new CarController();

const CarService = (props: {user: json, setError: Function}) => {
    const[car, setCar] = useState<Car>();
    const[carModalShow, setCarModalShow] = useState<boolean>(false);
    
    let { carId } = useParams<string>();

    const getCar = useCallback(() => {
        if(carId === undefined) {
            return;
        }
        CONTROLLER.get(
            carId, 
            props.user.email, 
            setCar,
            props.setError
        );
    }, [props.user.email, props.setError, carId])

    useEffect(() => {
        getCar();
        console.log("in the car service component")
    }, [getCar])

    return {
        car,
        setCar,
        carModalShow,
        setCarModalShow,
        carId
    }
}

export default CarService;