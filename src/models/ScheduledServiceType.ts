import { v4 as uuidv4 } from "uuid";
import { json } from "../custom_types/json";

type sstSchedule = {
    [carId: string]: {
        miles: number,
        time: {quantity: number, units: "day" | "week" | "month" | "year"}
    }
}

interface ScheduledServiceType {
    id: string;
    userCreated: string;
    dateCreated: number;
    serviceName: string;
    carsScheduled: sstSchedule
}

const constructScheduledServiceType = (
    userCreated: string, 
    id?: string, 
    dateCreated?: number,
    serviceName?: string, 
    carsScheduled?: sstSchedule
): ScheduledServiceType => {
    let sst: ScheduledServiceType = {
        id: id === undefined ? uuidv4().toString() : id,
        userCreated: userCreated,
        dateCreated: dateCreated === undefined ? new Date().getTime() : dateCreated,
        serviceName: serviceName === undefined ? "" : serviceName,
        carsScheduled: carsScheduled === undefined ? {} : carsScheduled
    }
    return sst;
}

const fromJson = (sstJson: json): ScheduledServiceType => {
    let sst: ScheduledServiceType = constructScheduledServiceType(
        sstJson.userCreated,
        sstJson.id,
        sstJson.dateCreated,
        sstJson.serviceName,
        sstJson.carsScheduled
    );
    return sst;
}

export { constructScheduledServiceType, fromJson };
export type { ScheduledServiceType };