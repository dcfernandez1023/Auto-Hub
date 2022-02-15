import { Service } from "./Service";
import { v4 as uuidv4 } from "uuid";
import { json } from "../custom_types/json";

interface RepairService extends Service {
    serviceType: "repair";
}

const newRepairService = (userCreated: string, carRefId: string) => {
    let repairService: RepairService = {
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
        serviceType: "repair",
    }
    return repairService;
}

const fromJson = (serviceJson: json): RepairService => {
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
        serviceType: "repair"
    }
}

export type { RepairService };
export { newRepairService, fromJson };