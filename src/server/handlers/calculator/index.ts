import { type TreePurchase, type OffsetSimulation } from '@prisma/client';

import PrismaInstance from '@/utils/helpers/clients/prisma.client';
import { INITIAL_COST, INITIAL_ANNUAL_COST } from '@/utils/constants';

type Purchase = Omit<TreePurchase, 'id' | 'createdAt' | 'updatedAt' | 'totalCost'>;
export const calculateTotalCost = (purchases: Purchase[]) => {
  const totalCost = purchases.reduce((acc, { treeCount }) => acc + treeCount * INITIAL_COST, 0);

  return totalCost;
};

export const calculateMaintenanceCost = (purchases: Purchase[]) => {
  const totalCost = purchases.reduce((acc, { treeCount }) => acc + treeCount * INITIAL_ANNUAL_COST, 0);

  return totalCost;
};
type Simulation = Omit<OffsetSimulation, 'createdAt' | 'updatedAt' | 'id' >;
export const saveOffsetCalculation = (calculation:Simulation) => {
  const offsetCalculation = PrismaInstance.offsetSimulation.create({
    data: calculation,
  });

  return offsetCalculation;
};
