import { router } from '@/server/trpc';

import EmissionsRouter from '@/server/routers/subrouters/emissions.router';
import FootprintRouter from '@/server/routers/subrouters/footprint.router';
import PurchaseRouter from '@/server/routers/subrouters/purchase.router';
import LocationRouter from '@/server/routers/subrouters/location.router';
import CalculatorRouter from '@/server/routers/subrouters/calculator.router';

const AppRouter = router({
  emissions: EmissionsRouter,
  footprint: FootprintRouter,
  purchase: PurchaseRouter,
  location: LocationRouter,
  calculator: CalculatorRouter,
});

export type TAppRouter = typeof AppRouter;

export default AppRouter;
