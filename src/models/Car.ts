import { Cost, newCost } from "./Cost";
import { v4 as uuidv4 } from "uuid";
import { ScheduledService } from "./ScheduledService";
import { RepairService } from "./RepairService";
import { json } from "../custom_types/json";

interface Car {
    id: string;
    userCreated: string;
    dateCreated: number;
    imageId: string;
    imageUrl: string;
    scheduledCost: Cost;
    repairCost: Cost;
    year: string;
    make: string;
    model: string;
    name: string;
    licensePlate: string;
    mileage: number;
    vinNumber: string;
    scheduledLog: ScheduledService[];
    repairLog: RepairService[];
    notes: string;
}

const constructCar = (
    userCreated: string, 
    year: string, 
    make: string, 
    model: string, 
    name: string,
    id?: string,
    dateCreated?: number,
    imageId?: string,
    imageUrl?: string,
    scheduledCost?: Cost,
    repairCost?: Cost,
    licensePlate?: string, 
    mileage?: number, 
    vinNumber?: string, 
    scheduledLog?: ScheduledService[],
    repairLog?: RepairService[],
    notes?: string
): Car => {
    if(userCreated === undefined || year === undefined || make === undefined || name === undefined) {
        throw new Error("Cannot construct Car object with the fields provided. Some are undefined");
    }
    let car: Car = {
        userCreated: userCreated,
        year: year,
        make: make,
        model: model,
        name: name,
        id: id === undefined ? uuidv4().toString() : id,
        dateCreated: dateCreated === undefined ? new Date().getTime() : dateCreated,
        imageId: imageId === undefined ? "" : imageId,
        imageUrl: imageUrl === undefined ? "" : imageUrl,
        scheduledCost: scheduledCost === undefined ? newCost() : scheduledCost,
        repairCost: repairCost === undefined ? newCost() : repairCost,
        licensePlate: licensePlate === undefined ? "" : licensePlate,
        mileage: mileage === undefined ? 0 : mileage,
        vinNumber: vinNumber=== undefined ? "" : vinNumber,
        scheduledLog: scheduledLog === undefined ? [] : scheduledLog,
        repairLog: repairLog === undefined ? [] : repairLog,
        notes: notes === undefined ? "" : notes,
    }
    return car
}

const fromJson = (carJson: json): Car => {
    let car: Car = constructCar(
        carJson.userCreated,
        carJson.year,
        carJson.make,
        carJson.model,
        carJson.name,
        carJson.id,
        carJson.dateCreated,
        carJson.imageId,
        carJson.imageUrl,
        carJson.scheduledCost,
        carJson.repairCost,
        carJson.licensePlate,
        carJson.mileage,
        carJson.vinNumber,
        carJson.scheduledLog,
        carJson.repairLog,
        carJson.notes,
    );
    return car
}

const getUIMetaData = (): json[] => {
    const getYears = (startYear: number): string[] => {
        let currentYear = new Date().getFullYear();
        let years = [];
        while(currentYear >= startYear) {
          years.push((currentYear--).toString());
        }
        return years;
    }
    return [
        {id: "car-modal-name", field: "name", display: "Name", element: "input", required: true, col: 6, type: "string"},
        {id: "car-modal-mileage", field: "mileage", display: "Mileage", element: "input", required: true, col: 6, type: "number"},
        {id: "car-modal-year", field: "year", display: "Year", element: "select", options: getYears(1900), required: true, col: 4, type: "string"},
        {id: "car-modal-make", field: "make", display: "Make", element: "input", required: true, col: 4, type: "string"},
        {id: "car-modal-model", field: "model", display: "Model", element: "input", required: true, col: 4, type: "string"},
        {id: "car-modal-licensePlate", field: "licensePlate", display: "License Plate #", element: "input", required: false, col: 6, type: "string"},
        {id: "car-modal-vinNumber", field: "vinNumber", display: "VIN #", element: "input", required: false, col: 6, type: "string"},
        {id: "car-modal-notes", field: "notes", display: "Notes", element: "textarea", required: false, col: 12, type: "string"},
        {id: "car-modal-imageId", field: "imageId", display: "Image", element: "file", required: false, col: 12, type: "file"}
    ];
}

export type { Car };
export { constructCar, getUIMetaData, fromJson };