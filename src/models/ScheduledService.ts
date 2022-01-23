import { Service } from "./Service";
import { v4 as uuidv4 } from "uuid";

interface ScheduledService extends Service {
    serviceType: "scheduled";
    sstRefId: string;
    nextServiceDate: string;
    nextServiceMileage: string;
}

const newScheduledService = (userCreated: string, carRefId: string, sstRefId: string) => {
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

export type { ScheduledService };
export { newScheduledService };