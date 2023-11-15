import type { GetServerSidePropsContext } from 'next';
import { getAuth } from '@clerk/nextjs/server';

const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext['req']
}) => getAuth(ctx.req);

export default getServerAuthSession;
