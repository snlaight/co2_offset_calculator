import { TRPCError, type inferRouterOutputs } from '@trpc/server';
import { parse } from 'valibot';

import { userProcedure } from '@/server/procedures';
import { router } from '@/server/trpc';
import { getUserFootprint, insertUserFootprint, updateUserFootprint } from '@/server/handlers/footprint';
import { FootprintInputSchema, UpdateFootprintInputSchema } from '@/utils/validations/footprint-routes.schema';

const FootprintRouter = router({
  getUserFootprint: userProcedure.query(async ({ ctx }) => {
    const footprint = await getUserFootprint(ctx.session.user.id);

    if (!footprint) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No footprint found',
      });
    }

    return footprint;
  }),
  createUserFootprint: userProcedure.input((i) => parse(FootprintInputSchema, i)).mutation(async ({ ctx, input }) => {
    const { category, value } = input;

    const footprint = await insertUserFootprint(ctx.session.user.id, category, value);

    if (!footprint) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Could not create footprint',
      });
    }

    return footprint;
  }),
  updateUserFootprint: userProcedure.input((i) => parse(UpdateFootprintInputSchema, i)).mutation(async ({ ctx, input }) => {
    const { category, value } = input;

    const footprint = await updateUserFootprint(ctx.session.user.id, {
      category,
      value,
    });

    if (!footprint) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Could not update footprint',
      });
    }

    return footprint;
  }),
});

type FootprintRouterOutput = inferRouterOutputs<typeof FootprintRouter>

export type UserFootprintResponse = FootprintRouterOutput['getUserFootprint']
export type CreateUserFootprintResponse = FootprintRouterOutput['createUserFootprint']
export type UpdateUserFootprintResponse = FootprintRouterOutput['updateUserFootprint']

export default FootprintRouter;
