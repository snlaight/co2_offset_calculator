import { TRPCError, type inferRouterOutputs } from '@trpc/server';
import { parse } from 'valibot';

import PurchaseInputSchema from '@/utils/validations/purchase-routes.schema';
import { userProcedure } from '@/server/procedures';
import { router } from '@/server/trpc';
import { getUserPurchases, createUserPurchase, getUserPurchasesByYear } from '@/server/handlers/purchase';
import { MAX_PURCHASES_PER_YEAR } from '@/utils/constants';

const PurchaseRouter = router({
  userPurchases: userProcedure.query(async ({ ctx }) => {
    const purchases = await getUserPurchases(ctx.session.user.id);

    if (!purchases) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No purchases found for this user',
      });
    }

    return purchases;
  }),
  createPurchase: userProcedure.input((i) => parse(PurchaseInputSchema, i)).mutation(async ({ ctx, input }) => {
    const { purchaseDate, treeCount, totalCost } = input;

    const purchases = await getUserPurchasesByYear(ctx.session.user.id, purchaseDate.getFullYear());

    if (purchases.length >= MAX_PURCHASES_PER_YEAR) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You have already reached the maximum number of purchases for this year',
      });
    }

    const purchase = await createUserPurchase({
      userId: ctx.session.user.id,
      purchaseDate,
      treeCount,
      totalCost,
    });

    if (!purchase) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Could not create purchase',
      });
    }

    return purchase;
  }),

  getCarbonOffset: userProcedure.query(async ({ ctx }) => {
    const purchases = await getUserPurchases(ctx.session.user.id);

    if (!purchases) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No purchases found for this user',
      });
    }

    const totalCarbonOffset = purchases.reduce((acc, curr) => acc + curr.treeCount, 0);

    return totalCarbonOffset;
  }),
});

type PurchaseRouterOutput = inferRouterOutputs<typeof PurchaseRouter>

export type UserPurchasesResponse = PurchaseRouterOutput['userPurchases']
export type CreatePurchaseResponse = PurchaseRouterOutput['createPurchase']
export type GetCarbonOffsetResponse = PurchaseRouterOutput['getCarbonOffset']

export default PurchaseRouter;
