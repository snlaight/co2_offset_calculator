import { TRPCError, type inferRouterOutputs } from '@trpc/server';
import { parse } from 'valibot';

import { userProcedure } from '@/server/procedures';
import { router } from '@/server/trpc';
import { saveOffsetCalculation, calculateTotalCost, calculateMaintenanceCost } from '@/server/handlers/calculator';
import { SimulationSchema } from '@/utils/validations/calculator-routes.schema';

const CalculatorRouter = router({
  saveCalculation: userProcedure.input((i) => parse(SimulationSchema, i)).mutation(async ({ ctx, input }) => {
    const { country, purchases, year, totalCO2Offset, totalTreesPlanted, projectedOffsetYears } = input;

    const cleanPurchases = purchases.map((purchase) => ({
      purchaseDate: new Date(),
      treeCount: purchase.trees,
      userId: ctx.session.user.id,
    }));

    if (!cleanPurchases) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Could not save calculation',
      });
    }

    const data = {
      userId: ctx.session.user.id,
      country,
      totalTreesPlanted,
      year,
      totalCO2Offset,
      projectedOffsetYears,
      simulationDate: new Date(),
      totalCost: calculateTotalCost(cleanPurchases),
    };

    const calculation = await saveOffsetCalculation(data);

    if (!calculation) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Could not save calculation',
      });
    }

    return calculation;
  }),
  maintenanceCost: userProcedure.input((i) => parse(SimulationSchema, i)).mutation(async ({ ctx, input }) => {
    const { purchases } = input;

    if (!purchases) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Could not calculate maintenance cost',
      });
    }

    const cleanPurchases = purchases.map((purchase) => ({
      purchaseDate: new Date(),
      treeCount: purchase.trees,
      userId: ctx.session.user.id,
    }));

    const cost = calculateMaintenanceCost(cleanPurchases);

    return cost;
  }),
});

type CalculatorRouterOutput = inferRouterOutputs<typeof CalculatorRouter>

export type SaveCalculationResponse = CalculatorRouterOutput['saveCalculation']
export type MaintenanceCostResponse = CalculatorRouterOutput['maintenanceCost']

export default CalculatorRouter;
