import { minLength, string, object, number, partial } from 'valibot';

export const FootprintInputSchema = object({
  category: string('Category is required', [minLength(1, 'Category must be a minimum of 2 characters')]),
  value: number('Value is required'),
});

export const UpdateFootprintInputSchema = partial(FootprintInputSchema);
