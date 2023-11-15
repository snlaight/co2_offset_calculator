import { currentUser } from '@clerk/nextjs';
import { UserType } from '@prisma/client';

import PrismaInstance from '@/utils/helpers/clients/prisma.client';

const getCurrentUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return user;
};

export const isAdmin = async (userId?:string) => {
  if (!userId) return false;

  const { userType } = (await PrismaInstance.clerkUserReference.findFirst({
    where: {
      clerkUserId: userId,
    },
    select: {
      userType: true,
    },
  })) || {};
  return userType === UserType.Admin;
};

export default getCurrentUser;
