'use client';

import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

import Button from '@/components/buttons/Button';

const Navbar = () => {
  const { isSignedIn, signOut } = useAuth();

  return (
    <nav className='p-4 bg-transparent flex items-center justify-between'>
      <Link className='flex items-center' href='/'>
        <div className='relative w-24 h-24 mr-4'>
          <Image fill alt='logo' src='/carbon_calc_quest_logo_full.png' />
        </div>
      </Link>
      <div className='flex items-center gap-x-2'>
        <Link href={isSignedIn ? '/dashboard' : '/sign-in'}>
          <Button disableRipple color={isSignedIn ? 'gradient' : 'gradient'} className='rounded-lg p-4 '>
            {isSignedIn ? 'Dashboard' : 'Get Started'}
          </Button>
        </Link>
        {isSignedIn && (
        <Button onClick={() => signOut()} color='error' variant='shadow' isIconOnly className=' rounded p-3'>
          <LogOut />
        </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
