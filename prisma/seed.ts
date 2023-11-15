/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from '@prisma/client';

import EmissionsData from './data/co2_emissions.json';

const prisma = new PrismaClient();

type EmissionsDataObject = {
  [key: string]: {
    iso_code: string;
    CO2_per_capita: number;
  };
};

const emissionsData: EmissionsDataObject = EmissionsData;

const data = Object.keys(emissionsData).map((key) => ({
  country_name: key,
  country_code: emissionsData[key].iso_code,
  emissions_per_capita: emissionsData[key].CO2_per_capita,
}));

const seed = async () => {
  const emissions = await prisma.emissions.createMany({
    data,
    skipDuplicates: true,
  });

  console.log('seeded emissions data, output dto:', emissions);
};

seed().then(async () => {
  await prisma.$disconnect();
}).catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
