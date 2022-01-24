import { useState, useEffect, useCallback } from 'react';
import { SstController } from '../../controllers/SstController';
import { CarController } from '../../controllers/CarController';
import { json } from '../../custom_types/json';
import { ScheduledServiceType as Sst } from '../../models/ScheduledServiceType';
import { Car } from '../../models/Car';
const CONTROLLER = new SstController();
const CAR_CONTROLLER = new CarController();

const SstPageService = (props: {user: json, setError: Function}) => {
    const[ssts, setSsts] = useState<Sst[]>();
    const[cars, setCars] = useState<Car[]>();
    const[sst, setSst] = useState<Sst>();
    const[showSstModal, setShowSstModal] = useState<boolean>(false);
    const[showDelete, setShowDelete] = useState<boolean>(false);
    const[mode, setMode] = useState<"create" | "edit">("create");

    const getSstDisplayData = (userSsts: Sst[], userCars: Car[]): json[] => {
        let carsJson: json = {};
        // convert cars from array to JSON 
        for(var i: number = 0; i < userCars.length; i++) {
            let car: Car = userCars[i];
            carsJson[car.id] = car;
        }
        // construct display data 
        let displayData: json[] = [];
        for(var n: number = 0; n < userSsts.length; n++) {
            let sst: Sst = userSsts[n];
            let data: json = {sstName: "", carsApplied: [], sst: sst};
            data.sstName = sst.serviceName;
            for(var carIndex: number = 0; carIndex < userCars.length; carIndex++) {
                let carId: string = userCars[carIndex].id;
                let isCarScheduled: boolean = sst.carsScheduled[carId] !== undefined;
                data.carsApplied.push(
                    {
                        carId: carId,
                        carName: userCars[carIndex].name,
                        mileInterval: isCarScheduled ? "Every " + sst.carsScheduled[carId].miles : "None",
                        timeInterval: isCarScheduled ? "Every " + sst.carsScheduled[carId].time.quantity + " " + sst.carsScheduled[carId].time.units + "(s)" : "None"
                    }
                );
            }
            displayData.push(data);
        }
        return displayData;
    }

    const getSstCallback = (userSsts: Sst[]) => {
        setSsts(userSsts);
    }

    const getCarsCallback = (userCars: Car[]) => {
        setCars(userCars);
    }

    const getSsts = useCallback(() => {
        CONTROLLER.getAll(props.user.email, getSstCallback, props.setError);
    }, [props.user.email, props.setError])

    const getCars = useCallback(() => {
        CAR_CONTROLLER.getAll(props.user.email, getCarsCallback, props.setError);
    }, [props.user.email, props.setError])

    useEffect(() => {
        console.log("in the sst service component");
        getCars();
        getSsts();
    }, [getCars, getSsts])

    return {
        ssts,
        cars,
        sst,
        setSst,
        showSstModal,
        showDelete,
        setShowDelete,
        mode,
        setMode,
        setShowSstModal,
        getSstDisplayData
    }
}

export default SstPageService;