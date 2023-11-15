import { type NextRequest } from 'next/server';
import { type NextApiRequest } from 'next';
import { type inferAsyncReturnType, initTRPC } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import superjson from 'superjson';
import { type SignedInAuthObject, type SignedOutAuthObject } from '@clerk/nextjs/server';
import { ValiError } from 'valibot';

import getServerAuthSession from '@/server/common/get-server-auth-session';
import PrismaInstance from '@/utils/helpers/clients/prisma.client';

type Request = NextRequest | NextApiRequest;

interface CreateContextOptions {
  session : SignedInAuthObject | SignedOutAuthObject | null;
  req: Request;
}

export const createContextInner = async (opts: CreateContextOptions) => ({
  session: opts.session,
  prisma: PrismaInstance,
  req: opts.req,
});

export const createContext = async ({ req } : CreateNextContextOptions) => {
  const session = await getServerAuthSession({ req });

  return createContextInner({
    session,
    req,
  });
};

type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        error: error instanceof ValiError ? error.cause : null,
      },
    };
  },
});

export const { router, procedure, middleware } = t;
