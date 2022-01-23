type Cost = {
    partsCost: number;
    laborCost: number;
};

const newCost = (): Cost => {
    return {
        partsCost: 0,
        laborCost: 0
    }
}

export type { Cost };
export { newCost };