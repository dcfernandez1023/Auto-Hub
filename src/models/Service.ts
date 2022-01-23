interface Service {
    id: string;
    userCreated: string;
    serviceType: string;
    carRefId: string;
    datePerformed: number;
    serviceName: string;
    mileage: number;
    partsCost: number;
    laborCost: number;
    totalCost: number;
    notes: string;
}

export type { Service };