import { use } from 'react';
import { UserButton } from '@clerk/nextjs';

import getCurrentUser from '@/utils/helpers/getCurrentUser';

const Navbar = () => {
  const user = use(getCurrentUser());

  return (
    <div className='flex items-center p-4'>
      {/* Space for mobile nav */}
      <div className='flex w-full justify-end'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};

export default Navbar;
