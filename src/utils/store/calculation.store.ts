import { create } from 'zustand';

interface CalculationStore {
  valueToOffset: number;
  currentOffset: number;
  setOffset: (valueToOffset: number, currentOffset: number) => void;
  resetOffset: () => void;
  country: string;
  setCountry: (country: string) => void;
}

const useCalculationStore = create<CalculationStore>((set) => ({
  valueToOffset: 0,
  currentOffset: 0,
  setOffset: (valueToOffset: number, currentOffset: number) => set({ valueToOffset, currentOffset }),
  resetOffset: () => set({ valueToOffset: 0, currentOffset: 0 }),
  country: '',
  setCountry: (country: string) => set({ country }),
}));

export default useCalculationStore;
