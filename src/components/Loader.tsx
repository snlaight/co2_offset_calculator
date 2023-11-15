import Image from 'next/image';

const Loader = () => (
  <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
    <div className='w-36 h-36 relative animate-spin'>
      <Image alt='Logo' src='/carbon_calc_quest_logo.png' fill />
    </div>
    <p className='text-sm text-muted-foreground'>
      Please wait...
    </p>
  </div>
);

export default Loader;
