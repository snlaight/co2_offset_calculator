import { TRPCError, type inferRouterOutputs } from '@trpc/server';

import { userProcedure } from '@/server/procedures';
import { router } from '@/server/trpc';

// Define a custom type that extends the existing type of `ctx.req.headers`
type CustomHeaders = {
  [key: string]: string | string[] | undefined;
  'x-forwarded-for'?: string | string[];
};

const LocationRouter = router({
  getUserLocation: userProcedure.query(async ({ ctx }) => {
    const ip: string | string[] | undefined = (ctx.req.headers as unknown as CustomHeaders)['x-forwarded-for'];

    if (!ip) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No IP address found',
      });
    }

    const location = await fetch(`http://ip-api.com/json/${ip.toString()}?fields=countryCode,country`)
      .then((res: Response) => res.json())
      .then((data: { countryCode: string, country: string }) => data);

    if (!location) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'There was an error retrieving your location',
      });
    }

    return location;
  }),
});

type LocationRouterOutput = inferRouterOutputs<typeof LocationRouter>;

export type UserLocationResponse = LocationRouterOutput['getUserLocation'];

export default LocationRouter;
