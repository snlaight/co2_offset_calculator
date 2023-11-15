import { TRPCError, type inferRouterOutputs } from '@trpc/server';
import { parse } from 'valibot';

import { userProcedure } from '@/server/procedures';
import { router } from '@/server/trpc';
import { getEmissions, getEmissionsByCountry, getOrderedEmissions, getAverageEmissions } from '@/server/handlers/emissions';
import { EmissionsInputSchema } from '@/utils/validations/emissions-routes.schema';

const EmissionsRouter = router({
  getAllEmissions: userProcedure.query(async () => {
    const emissions = await getEmissions();

    if (!emissions) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No emissions found',
      });
    }

    return emissions;
  }),
  getCalculatedEmissions: userProcedure.query(async () => {
    const highestAverage = await getOrderedEmissions('desc');

    const lowestAverage = await getOrderedEmissions('asc');

    const average = await getAverageEmissions();

    if (!highestAverage || !lowestAverage || !average) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'There was an error calculating the emissions',
      });
    }

    return {
      highestAverage,
      lowestAverage,
      average,
    };
  }),
  countryEmissions: userProcedure.input((i) => parse(EmissionsInputSchema, i))
    .query(async ({ input }) => {
      const { ISOCode } = input;
      const emissions = await getEmissionsByCountry(ISOCode);

      if (!emissions) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No information found for this country',
        });
      }

      return emissions;
    }),
});

type EmissionsRouterOutput = inferRouterOutputs<typeof EmissionsRouter>

export type EmmissionsResponse = EmissionsRouterOutput['getAllEmissions']
export type CalculatedEmissionsResponse = EmissionsRouterOutput['getCalculatedEmissions']
export type CountryEmissionsResponse = EmissionsRouterOutput['countryEmissions']

export default EmissionsRouter;
