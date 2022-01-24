import { useState, useEffect } from 'react';
import { json } from '../../custom_types/json';
import { SstController } from '../../controllers/SstController';
import { ScheduledServiceType as Sst, constructScheduledServiceType } from '../../models/ScheduledServiceType';
import { Car } from '../../models/Car';
const CONTROLLER = new SstController();

const SstModalService = (props: {user: json, mode: "create" | "edit", show: boolean, sst: Sst | undefined, cars: Car[], onClose: Function, setError: Function}) => {
    const[sst, setSst] = useState<Sst>(constructScheduledServiceType(props.user.email));
    const[validated, setValidated] = useState(false);
    const[isLoading, setIsLoading] = useState(false);

    const[everyMileage, setEveryMileage] = useState<number>(0);
    const[everyTimeQuantity, setEveryTimeQuantity] = useState<number>(0);
    const[everyTimeUnits, setEveryTimeUnits] = useState<string>("");
    const[selectedVehicles, setSelectedVehicles] = useState<json>({});

    const selectVehicle = (carId?: string) => {
        let selectedCopy: json = Object.assign({}, selectedVehicles);
        if(carId === undefined) {
            if(Object.keys(selectedCopy).length === props.cars.length) {
                for(var x: number = 0; x < props.cars.length; x++) {
                    let car: Car = props.cars[x];
                    delete selectedCopy[car.id];
                }
            }
            else {
                for(var i: number = 0; i < props.cars.length; i++) {
                    let car: Car = props.cars[i];
                    selectedCopy[car.id] = true;
                }
            }
        }
        else if(selectedCopy[carId] === undefined) {
            selectedCopy[carId] = true;
        }
        else {
            delete selectedCopy[carId];
        }
        setSelectedVehicles(selectedCopy);
    }

    const applyIntervalsToSelectedVehicles = () => {
        let sstCopy: Sst = Object.assign({}, sst);
        for(var i: number = 0; i < props.cars.length; i++) {
            let car: Car = props.cars[i];
            if(selectedVehicles[car.id] === undefined) {
                continue;
            }
            if(sstCopy.carsScheduled[car.id] === undefined) {
                sstCopy.carsScheduled[car.id] = {
                    miles: everyMileage,
                    time: {quantity: everyTimeQuantity, units: everyTimeUnits}
                }
            }
            else {
                sstCopy.carsScheduled[car.id].miles = everyMileage;
                sstCopy.carsScheduled[car.id].time.quantity = everyTimeQuantity;
                sstCopy.carsScheduled[car.id].time.units = everyTimeUnits;
            }
        }
        setSst(sstCopy);
    } 

    const onChangeEveryMileage = (mileage: string) => {
        let reg: RegExp = /^\d+$/;
        if(!reg.test(mileage) && mileage.trim().length !== 0) {
            return;
        }
        let mileageInt: number = parseInt(mileage);
        if(isNaN(mileageInt)) {
            setEveryMileage(0);
        }
        else {
            setEveryMileage(mileageInt);
        }
    }

    const onChangeEveryTimeQuantity = (quantity: string) => {
        let reg: RegExp = /^\d+$/;
        if(!reg.test(quantity) && quantity.trim().length !== 0) {
            return;
        }
        let quantityInt: number = parseInt(quantity);
        if(isNaN(quantityInt)) {
            setEveryTimeQuantity(0);
        }
        else {
            setEveryTimeQuantity(quantityInt);
        }
    }

    const onChangeEveryTimeUnits = (units: string) => {
        setEveryTimeUnits(units);
    }

    const onSetSst = (updatedSst: Sst) => {
        setValidated(false);
        setSst(updatedSst);
    }

    const onClose = () => {
        setSst(props.sst === undefined ? constructScheduledServiceType(props.user.email) : props.sst);
        setValidated(false);
        setIsLoading(false);
        props.onClose();
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        let isValid: boolean = true;
        if(sst.serviceName.trim().length === 0) {
            sst.serviceName = sst.serviceName.trim();
            isValid = false;
        }
        setValidated(true);
        if(!isValid) {
            return;
        }
        // Validate fields 
        for(var carId in sst.carsScheduled) {
            let carScheduled: json | undefined = sst.carsScheduled[carId];
            if(carScheduled.time.quantity > 0 && carScheduled.time.units.trim().length === 0) {
                return;
            }
            if(carScheduled.time.units.trim().length > 0 && carScheduled.time.quantity === 0) {
                return;
            }
            if(carScheduled.miles === 0 && carScheduled.time.quantity === 0 && carScheduled.time.units.trim().length === 0) {
                delete sst.carsScheduled[carId];
            }
        }
        setIsLoading(true);
        if(props.mode === "create") {
            CONTROLLER.create(onClose, props.setError, sst);
        }
        else if(props.mode === "edit") {
            CONTROLLER.update(sst, onClose, props.setError);
        }
    }

    const onChangeServiceName = (e: any) => {
        let sstCopy: Sst = Object.assign({}, sst);
        sstCopy.serviceName = e.target.value;
        onSetSst(sstCopy);
    }

    const onChangeMileageInterval = (carId: string, miles: string) => {    
        // regex to check that miles is a positive integer 
        let reg: RegExp = /^\d+$/;
        if(!reg.test(miles) && miles.trim().length !== 0) {
            return;
        }
        let sstCopy: Sst = Object.assign({}, sst);
        let milesInt: number = parseInt(miles);
        if(isNaN(milesInt)) {
            milesInt = 0;
        }
        if(sstCopy.carsScheduled[carId] === undefined) {
            sstCopy.carsScheduled[carId] = {
                miles: milesInt,
                time: {quantity: 0, units: ""}
            }
        }
        else {
            sstCopy.carsScheduled[carId].miles = milesInt;
        }
        onSetSst(sstCopy);
    }

    const onChangeTimeQuantity = (carId: string, quantity: string) => {
        // regex to check that quantity is a positive integer 
        let reg: RegExp = /^\d+$/;
        if(!reg.test(quantity) && quantity.trim().length !== 0) {
            return;
        }
        let sstCopy: Sst = Object.assign({}, sst);
        let quantityInt: number = parseInt(quantity);
        if(isNaN(quantityInt)) {
            quantityInt = 0;
        }
        if(sstCopy.carsScheduled[carId] === undefined) {
            sstCopy.carsScheduled[carId] = {
                miles: 0,
                time: {quantity: quantityInt, units: ""}
            }
        }
        else {
            sstCopy.carsScheduled[carId].time.quantity = quantityInt;
        }
        onSetSst(sstCopy);
    }

    const onChangeTimeUnits = (carId: string, units: string) => {
        let sstCopy: Sst = Object.assign({}, sst);
        if(sstCopy.carsScheduled[carId] === undefined) {
            sstCopy.carsScheduled[carId] = {
                miles: 0,
                time: {quantity: 0, units: units}
            }
        }
        else {
            sstCopy.carsScheduled[carId].time.units = units;
        }
        onSetSst(sstCopy);
    }
    
    useEffect(() => {
        console.log("in the sst modal service component");
        if(props.sst !== undefined) {
            setSst(props.sst);
        }
        else {
            setSst(constructScheduledServiceType(props.user.email));
        }
    }, [props.sst, props.user.email])

    return {
        sst,
        validated,
        isLoading,
        onClose,
        onSubmit,
        onChangeServiceName,
        onChangeMileageInterval,
        onChangeTimeQuantity,
        onChangeTimeUnits,
        everyMileage,
        everyTimeQuantity,
        everyTimeUnits,
        onChangeEveryMileage,
        onChangeEveryTimeQuantity,
        onChangeEveryTimeUnits,
        selectedVehicles,
        selectVehicle,
        applyIntervalsToSelectedVehicles
    }
}

export default SstModalService;