import * as trpc from '@trpc/server';
import { UserType } from '@prisma/client';

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

export const adminProcedure = userProcedure.use(async ({ ctx, next }) => {
  const { userType } = (await ctx.prisma.clerkUserReference.findFirst({
    where: {
      clerkUserId: ctx.session.user.id,
    },
    select: {
      userType: true,
    },
  })) || {};

  if (userType !== UserType.Admin) {
    throw new trpc.TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be an admin to perform this action.',
    });
  }

  return next({
    ctx,
  });
});
