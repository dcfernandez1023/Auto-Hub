import { Service } from "./Service";
import { v4 as uuidv4 } from "uuid";
import { json } from "../custom_types/json";

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

// const metadata: json[] = [
//     {
//         key: "datePerformed",
//         display: "Date Performed",
//         type: "number",
//         element: "date",
//         editable: true
//     },
//     {
//         key: "serviceName",
//         display: "Service Name",
//         type: "string",
//         element: "select",
//         editable: true
//     },
//     {
//         key: "mileage",
//         display: "Mileage",
//         type: "number",
//         element: "input",
//         editable: true
//     },
//     {
//         key: "nextServiceDate",
//         display: "Next Service Date",
//         type: "number",
//         element: "input",
//         editable: false
//     },
//     {
//         key: "nextServiceMileage",
//         display: "Next Service Mileage",
//         type: "number",
//         element: "input",
//         editable: false
//     },
//     {
//         key: "partsCost",
//         display: "Next Service Mileage",
//         type: "number",
//         element: "input",
//         editable: true
//     },
//     {
//         key: "laborCost",
//         display: "Next Service Mileage",
//         type: "number",
//         element: "input",
//         editable: true
//     },
//     {
//         key: "totalCost",
//         display: "Total Cost",
//         type: "number",
//         element: "input",
//         editable: true
//     },
//     {
//         key: "notes",
//         display: "Notes",
//         type: "string",
//         element: "textarea",
//         editable: true
//     }
// ];

export type { ScheduledService };
// export { metadata };
export { newScheduledService };
