import { Service } from "./Service";
import { v4 as uuidv4 } from "uuid";

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

export type { RepairService };
export { newRepairService };