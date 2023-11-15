import Image from 'next/image';
import Button from '@/components/buttons/Button';

interface EmptyErrorProps {
  label: string;
  onReset: () => void;
}

const EmptyError = ({ label, onReset }: EmptyErrorProps) => (
  <div className='h-full p-20 flex flex-col items-center justify-center'>
    <div>
      <Image src='/empty.png' width={200} height={200} alt='error' />
    </div>
    <p>
      {label}
    </p>
    <Button color='primary' onPress={onReset}>
      Retry
    </Button>
  </div>
);

export default EmptyError;
