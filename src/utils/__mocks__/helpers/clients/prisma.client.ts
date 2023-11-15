import type { PrismaClient } from '@prisma/client';
import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';

const MockPrismaInstance = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(MockPrismaInstance);
});

export default MockPrismaInstance;
