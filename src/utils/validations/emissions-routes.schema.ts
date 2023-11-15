import { minLength, string, object, number } from 'valibot';

export const EmissionsInputSchema = object({
  ISOCode: string('Country code is required', [minLength(1, 'Country code must be a minimum of 2 characters')]),
});

export const UpdateEmissionsInputSchema = object({
  ISOCode: string('Country code is required', [minLength(1, 'Country code must be a minimum of 2 characters')]),
  value: number('Value is required'),
});
