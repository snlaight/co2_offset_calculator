import { type TreePurchase } from '@prisma/client';

import PrismaInstance from '@/utils/helpers/clients/prisma.client';

type Purchase = Omit<TreePurchase, 'createdAt' | 'updatedAt' | 'id'>

export const getUserPurchases = async (userId: string) => {
  const purchases = await PrismaInstance.treePurchase.findMany({
    where: {
      userId,
    },
  });

  return purchases;
};

export const getUserPurchasesByYear = async (userId: string, year: number) => {
  const purchases = await PrismaInstance.treePurchase.findMany({
    where: {
      userId,
      purchaseDate: {
        gte: new Date(year, 0, 1),
        lt: new Date(year + 1, 0, 1),
      },
    },
  });

  return purchases;
};

export const createUserPurchase = async (data: Purchase) => {
  const purchase = await PrismaInstance.treePurchase.create({
    data,
  });

  return purchase;
};

export const getUserTotalYearPurchases = async (userId: string, year: number) => {
  const purchases = await getUserPurchasesByYear(userId, year);

  const totalPurchases = purchases.reduce((total, purchase) => total + purchase.totalCost, 0);

  return totalPurchases;
};

export const getTotalTreesPlanted = async (userId: string) => {
  const purchases = await getUserPurchases(userId);

  const totalTreesPlanted = purchases.reduce((total, purchase) => total + purchase.treeCount, 0);

  return totalTreesPlanted;
};
