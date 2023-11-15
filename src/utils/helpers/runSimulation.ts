/* eslint-disable no-plusplus */
import calculateTreeOffset from '@/utils/helpers/calculateTreeOffset';

interface Purchase {
  year: number;
  trees: number;
}

export interface Simulation {
  country?: string;
  purchases: Purchase[];
  year: number;
}

const runSimulation = (simulation: Simulation) => {
  const purchasesByYear: { [key: number]: number } = simulation.purchases.reduce((acc, purchase) => {
    acc[purchase.year] = purchase.trees;
    return acc;
  }, {} as { [key: number]: number });

  const sum = Object.keys(purchasesByYear).reduce((acc, year) => {
    const trees = purchasesByYear[year as unknown as number];

    const offset = calculateTreeOffset(+year, simulation.year) * trees;
    return acc + offset;
  }, 0);

  return sum;
};

export default runSimulation;
