/* eslint-disable import/prefer-default-export */
import * as trpc from '@trpc/server';
import { procedure, middleware } from '@/server/trpc';
import getCurrentUser from '@/utils/helpers/getCurrentUser';

const checkIfUserIsLoggedIn = middleware(async (opts) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new trpc.TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action.',
    });
  }

  return opts.next({
    ctx: {
      session: {
        user,
      },
    },
  });
});

export const userProcedure = procedure.use(checkIfUserIsLoggedIn);
