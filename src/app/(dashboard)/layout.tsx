/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Here we disable the unsafe assignment rule because we are using Clerk's User type, and it throws an error when we try to use it by parsing it as JSON to pass to the Sidebar component. We can safely ignore this error because we know that the user object is a User type and this is a react server components issue.

import { use } from 'react';
import { redirect } from 'next/navigation';

import getCurrentUser, { isAdmin } from '@/utils/helpers/getCurrentUser';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export const dynamic = 'force-dynamic';

const DashboardLayout = ({ children }: {children: React.ReactNode}) => {
  const user = use(getCurrentUser());

  if (!user) {
    redirect('/');
  }

  const isUserAdmin = use(isAdmin(user.id));

  return (
    <div className='h-full relative'>
      <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900'>
        <Sidebar isAdmin={isUserAdmin} />
      </div>
      <main className='md:pl-72 pb-10'>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
