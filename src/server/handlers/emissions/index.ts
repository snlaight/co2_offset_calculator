import PrismaInstance from '@/utils/helpers/clients/prisma.client';

export const getEmissions = async () => {
  const emissions = await PrismaInstance.emissions.findMany({
    select: {
      country_name: true,
      country_code: true,
      emissions_per_capita: true,
    },
  });

  return emissions;
};

export const getOrderedEmissions = async (order: 'asc' | 'desc' = 'desc') => {
  const emissions = await PrismaInstance.emissions.findFirst({
    orderBy: {
      emissions_per_capita: order,
    },
    select: {
      country_name: true,
      country_code: true,
      emissions_per_capita: true,
    },
  });

  return emissions;
};

export const getAverageEmissions = async () => {
  const emissions = await PrismaInstance.emissions.aggregate({
    _avg: {
      emissions_per_capita: true,
    },
  });

  return emissions;
};

export const getEmissionsByCountry = async (ISOCode: string) => {
  const emissions = await PrismaInstance.emissions.findFirst({
    where: {
      country_code: ISOCode,
    },
    select: {
      emissions_per_capita: true,
    },
  });

  return emissions;
};

export const updateEmissions = async (ISOCode: string, value: number) => {
  const emissions = await PrismaInstance.emissions.update({
    where: {
      country_code: ISOCode,
    },
    data: {
      emissions_per_capita: value,
    },
  });

  return emissions;
};
