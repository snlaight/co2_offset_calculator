import { minLength, string, object, number, array } from 'valibot';

export const PurchaseSchema = object({
  year: number('Year is required'),
  trees: number('Trees is required'),
});

export const SimulationSchema = object({
  country: string('Country is required', [minLength(1, 'Country must be a minimum of 2 characters')]),
  purchases: array(PurchaseSchema, 'Purchases is required'),
  year: number('Year is required'),
  totalTreesPlanted: number('Total trees planted is required'),
  totalCO2Offset: number('Total CO2 offset is required'),
  projectedOffsetYears: number('Projected offset years is required'),
});
