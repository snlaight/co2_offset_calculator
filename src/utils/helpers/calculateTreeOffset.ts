import { TREE_MAX_CO2_OFFSET } from '@/utils/constants';

const calculateTreeOffset = (purchaseYear: number, currentYear: number) => {
  const yearsDifference = purchaseYear - currentYear;

  const isOffsetMax = yearsDifference >= 6;

  const totalOffset = isOffsetMax ? TREE_MAX_CO2_OFFSET : (purchaseYear + 1 - currentYear) * 4.75;

  return totalOffset;
};

export default calculateTreeOffset;
