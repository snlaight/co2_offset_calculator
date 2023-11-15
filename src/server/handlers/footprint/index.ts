import { type CarbonFootprint } from '@prisma/client';

import PrismaInstance from '@/utils/helpers/clients/prisma.client';

export const getUserFootprint = async (userId: string) => {
  const footprint = await PrismaInstance.carbonFootprint.findFirst({
    where: {
      userId,
    },
  });

  return footprint;
};

export const insertUserFootprint = async (userId: string, category: string, value: number) => {
  const footprint = await PrismaInstance.carbonFootprint.create({
    data: {
      userId,
      category,
      value,
    },
  });

  return footprint;
};

export const updateUserFootprint = async (id: string, data: Partial<CarbonFootprint>) => {
  const footprint = await PrismaInstance.carbonFootprint.update({
    where: {
      id,
    },
    data,
  });

  return footprint;
};
