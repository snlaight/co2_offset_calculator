/* eslint-disable no-plusplus */
import calculateTreeOffset from '@/utils/helpers/calculateTreeOffset';

export interface Purchase {
  index?: number;
  year: number | Date;
  trees: number;
}

export interface Simulation {
  country?: string;
  purchases: Purchase[];
  year: number | Date;
}

const runSimulation = (simulation: Simulation) => {
  const purchasesByYear: { [key: number]: number } = simulation.purchases.reduce((acc, purchase) => {
    let { year } = purchase;

    if (typeof year !== 'number') {
      year = year.getFullYear();
    }

    acc[purchase.year as number] = purchase.trees;
    return acc;
  }, {} as { [key: number]: number });

  const sum = Object.keys(purchasesByYear).reduce((acc, year) => {
    const trees = purchasesByYear[year as unknown as number];

    const offset = calculateTreeOffset(new Date(year).getFullYear(), new Date(simulation.year).getFullYear()) * trees;

    return acc + offset;
  }, 0);

  return sum;
};

export default runSimulation;
