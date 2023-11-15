'use client';

import TypewriterComponent from 'typewriter-effect';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

import Button from '@/components/buttons/Button';

const Hero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className='text-white font-bold py-36 text-center space-y-5'>
      <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold'>
        <h1>Calculate your Carbon Footprint</h1>
        <div className='text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-600'>
          <TypewriterComponent
            options={{
              strings: ['Carbon Offset', 'Climate Change', 'Sustainability', 'Climate Crisis'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button color='gradient' className='md:text-lg p-4 md:p-6 rounded-full font-semibold '>
            Start Calculating for Free
          </Button>
        </Link>
      </div>
      <div className='text-zinc-400 text-xs md:text-sm font-normal'>
        No Credit card required.
      </div>
    </div>
  );
};

export default Hero;
