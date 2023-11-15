import { object, number, date } from 'valibot';

const PurchaseInputSchema = object({
  purchaseDate: date('Purchase date is required'),
  treeCount: number('Tree count is required'),
  totalCost: number('Total cost is required'),
});

export default PurchaseInputSchema;
