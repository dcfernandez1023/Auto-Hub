import { useState, useEffect, useCallback } from 'react';
import { CarController } from '../../controllers/CarController';
import { SstController } from '../../controllers/SstController';
import { json } from '../../custom_types/json';
import { Car } from "../../models/Car";
import { ScheduledServiceType as Sst } from '../../models/ScheduledServiceType';
import { useParams } from "react-router-dom";
const CONTROLLER: CarController = new CarController();
const SST_CONTROLLER: SstController = new SstController();

const CarService = (props: {user: json, setError: Function}) => {
    const[car, setCar] = useState<Car>();
    const[carModalShow, setCarModalShow] = useState<boolean>(false);
    const[ssts, setSsts] = useState<Sst[]>([]);
    
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

    const getSstCallback = (userSsts: Sst[]) => {
        setSsts(userSsts);
    }
    const getSsts = useCallback(() => {
        SST_CONTROLLER.getAll(props.user.email, getSstCallback, props.setError);
    }, [props.user.email, props.setError])

    useEffect(() => {
        getCar();
        getSsts();
        console.log("in the car service component")
    }, [getCar, getSsts])

    return {
        car,
        setCar,
        carModalShow,
        setCarModalShow,
        carId,
        ssts,
        setSsts
    }
}

export default CarService;