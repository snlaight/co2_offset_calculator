import { it, describe, expect, expectTypeOf } from 'vitest';

import absoluteUrl from '@/utils/helpers/absoluteUrl';
import getBaseUrl from '@/utils/helpers/getBaseUrl';
import runSimulation from '@/utils/helpers/runSimulation';
import calculateTreeOffset from '@/utils/helpers/calculateTreeOffset';

const Simulation = {
  country: 'United States',
  purchases: [
    {
      year: 2023,
      trees: 10,
    },
    {
      year: 2024,
      trees: 20,
    },
    {
      year: 2025,
      trees: 30,
    },
  ],
  year: 2021,
};

describe('absoluteUrl', () => {
  it('should return a full URL', () => {
    const url = absoluteUrl('/test');
    expect(url).toBe('http://localhost:3000/test');
  });
});

describe('getBaseUrl', () => {
  it('should return a base URL', () => {
    const url = getBaseUrl();
    expect(url).toBe('http://localhost:3000');
  });
});

describe('runSimulation', () => {
  it('should return a number', () => {
    const result = runSimulation(Simulation);
    expectTypeOf(result).toEqualTypeOf<number>();
  });
});

describe('calculateTreeOffset', () => {
  it('should return a number', () => {
    const result = calculateTreeOffset(2024, 2023);
    expectTypeOf(result).toEqualTypeOf<number>();
    expect(result).toBe(9.5);
  });
});
