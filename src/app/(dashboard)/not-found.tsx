import Link from 'next/link';

import Button from '@/components/buttons/Button';

const NotFoundPage = () => (
  <div className='h-[60vh] py-20 flex flex-col items-center'>
    <h2 className='font-black text-4xl text-red-800 mb-4'> 404 Not Found</h2>
    <p>
      Oh uh... looks like the page you&apos;re looking for doesn&apos;t exist.
    </p>
    <Link href='/'>
      <Button
        color='primary'
        className='py-2 px-4 mt-5'
      >
        Back home
      </Button>
    </Link>
  </div>
);

export default NotFoundPage;
