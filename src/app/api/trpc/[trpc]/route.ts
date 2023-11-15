import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type PrismaClient } from '@prisma/client';
import { type SignedInAuthObject, type SignedOutAuthObject } from '@clerk/nextjs/server';
import { type NextRequest } from 'next/server';

import AppRouter from '@/server/routers/_app';
import PrismaInstance from '@/utils/helpers/clients/prisma.client';

export const maxDuration = 90;

const handler = (req: NextRequest) => fetchRequestHandler({
  endpoint: '/api/trpc',
  req,
  router: AppRouter,
  createContext: () : {
    session: SignedInAuthObject | SignedOutAuthObject | null,
    prisma: PrismaClient,
    req: NextRequest,
  } => ({
    session: null,
    prisma: PrismaInstance,
    req,
  }),
});

export { handler as GET, handler as POST };
