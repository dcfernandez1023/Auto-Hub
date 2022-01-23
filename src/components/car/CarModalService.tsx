import { useEffect, useState } from 'react';
import { json } from '../../custom_types/json';
import { Car, constructCar, getUIMetaData, fromJson } from '../../models/Car';
import { CarController } from "../../controllers/CarController";

const CONTROLLER: CarController = new CarController();

const CarModalService = (props: {mode: "create" | "update", user: json, car: Car | undefined, show: boolean, onClose: Function, setError: Function}) => {
    const[car, setCar] = useState<Car>(constructCar(props.user.email, "", "", "", ""));
    const[validated, setValidated] = useState<boolean>(false);
    const[isLoading, setIsLoading] = useState<boolean>(false);

    const modalMetaData: json[] = getUIMetaData();

    useEffect(() => {
        if(props.car !== undefined) {
            setCar(props.car);
        }
        console.log("in car modal component");
    }, [props.user.email, props.car])

    const onChangeModalElement = (e: any, type: string) => {
        if(e.target === null) {
            return;
        }
        setValidated(false);
        let carCopy: json = Object.assign({}, car);
        if(type === "number") {
            let reg: RegExp = /^\d+$/;
            if(!reg.test(e.target.value) && (e.target.value).trim().length !== 0) {
                return;
            }
        }
        carCopy[e.target.name] = e.target.value;
        setCar(fromJson(carCopy));
    }

    const onModalClose = () => {
        setValidated(false);
        setIsLoading(false);
        if(props.mode === "create") {
            setCar(constructCar(props.user.email, "", "", "", ""));
        }
        props.onClose();
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        let carCopy: json = Object.assign({}, car);
        let fields: json[] = modalMetaData;
        let isValid: boolean = true;
        for(var i: number = 0; i < fields.length; i++) {
            let metadata: json = fields[i];            
            if(metadata.type === "number") {
                if(carCopy[metadata.field].toString().trim().length === 0) {
                    carCopy[metadata.field] = 0;
                }
                continue;
            }
            if(metadata.required && (carCopy[metadata.field] === undefined || carCopy[metadata.field].trim().length === 0)) {
                isValid = false;
                carCopy[metadata.field] = "";
            }
        }
        let carCopyAsCar: Car = fromJson(carCopy);
        if(!isValid) {
            setCar(carCopyAsCar);
            setValidated(true);
            return;
        }
        setIsLoading(true);
        if(props.mode === "create") {
            CONTROLLER.create(
                onModalClose, 
                props.setError,
                carCopyAsCar
            );
        }
        else {
            CONTROLLER.update(
                carCopyAsCar,
                onModalClose,
                props.setError
            );
        }
    }

    return {
        car,
        validated,
        isLoading,
        onChangeModalElement,
        onModalClose,
        onSubmit,
        modalMetaData
    };
}

export default CarModalService;