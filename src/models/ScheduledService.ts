import { Service } from "./Service";
import { v4 as uuidv4 } from "uuid";
import { json } from "../custom_types/json";

interface ScheduledService extends Service {
    serviceType: "scheduled";
    sstRefId: string;
    nextServiceDate: string;
    nextServiceMileage: string;
}

const newScheduledService = (userCreated: string, carRefId: string, sstRefId: string): ScheduledService => {
    let scheduledService: ScheduledService = {
        id: uuidv4().toString(),
        userCreated: userCreated,
        carRefId: carRefId,
        datePerformed: 0,
        serviceName: "",
        mileage: 0,
        partsCost: 0,
        laborCost: 0,
        totalCost: 0,
        notes: "",
        serviceType: "scheduled",
        sstRefId: sstRefId,
        nextServiceDate: "",
        nextServiceMileage: ""
    }
    return scheduledService;
}

const fromJson = (serviceJson: json): ScheduledService => {
    return {
        id: serviceJson.id,
        userCreated: serviceJson.userCreated,
        carRefId: serviceJson.carRefId,
        datePerformed: typeof serviceJson.datePerformed === "number" ? serviceJson.datePerformed : new Date().getTime(),
        serviceName: serviceJson.serviceName,
        mileage: typeof serviceJson.mileage === "number" ? serviceJson.mileage : 0,
        partsCost: typeof serviceJson.mileage === "number" ? serviceJson.mileage : 0,
        laborCost: typeof serviceJson.mileage === "number" ? serviceJson.mileage : 0,
        totalCost: typeof serviceJson.mileage === "number" ? serviceJson.mileage : 0,
        notes: serviceJson.notes,
        serviceType: "scheduled",
        sstRefId: serviceJson.sstRefId,
        nextServiceDate: serviceJson.nextServiceDate,
        nextServiceMileage: serviceJson.nextServiceDate
    }
}

export type { ScheduledService };
export { newScheduledService, fromJson };
