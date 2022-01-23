import { json } from "../custom_types/json";
import { Car, fromJson } from "../models/Car";

class CarController {
    private static CAR_COLLECTION = "carsV2";
    private db = require("../dal/db.ts");
    private protectedFields: string[] = [
        "id",
        "userCreated",
        "dateCreated"
    ];
    
    public getAll(userCreated: string, callback: Function, onError: Function): void {
        try {
            this.db.getQueryWithFilter("userCreated", userCreated, CarController.CAR_COLLECTION, onError)
                .onSnapshot((querySnapshot: json) => {
                    let cars: Car[] = [];
                    for(var i: number = 0; i < querySnapshot.docs.length; i++) {
                        let carJson: json = querySnapshot.docs[i].data();
                        cars.push(fromJson(carJson));
                    }
                    cars.sort((c1: Car, c2: Car) => {
                        return c2.dateCreated - c1.dateCreated;
                    });
                    callback(cars);
                }
            );
        }
        catch(error: any) {
            onError(error);
        }
    }

    public get(id: string, userCreated: string, callback: Function, onError: Function): void {
        try {
            this.db.getQueryWithFilters(["id", "userCreated"], ["==", "=="], [id, userCreated], CarController.CAR_COLLECTION, onError)
                .onSnapshot((querySnapshot: json) => {
                    let cars: Car[] = [];
                    for(var i: number = 0; i < querySnapshot.docs.length; i++) {
                        let carJson: Car = querySnapshot.docs[i].data();
                        cars.push(carJson);
                    }
                    if(cars.length !== 1) {
                        callback(null);
                    }
                    else {
                        callback(cars[0]);
                    }
                }
            );
        }
        catch(error: any) {
            onError(error);
        }
    }

    public create(callback: Function, onError: Function, car: Car): void {
        this.db.writeOne(car.id, car, CarController.CAR_COLLECTION, callback, onError);
    }

    public update(car: Car, callback: Function, onError: Function): void {
        this.db.writeOne(car.id, car, CarController.CAR_COLLECTION, callback, onError);
    }

    public delete(id: string, callback: Function, onError: Function): void {
        this.db.deleteOne(id, CarController.CAR_COLLECTION, callback, onError);
    }

}

export { CarController };