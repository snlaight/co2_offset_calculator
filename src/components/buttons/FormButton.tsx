'use client';

import { useFormStatus } from 'react-dom';

import Button from '@/components/buttons/Button';

interface FormButtonProps {
  children: React.ReactNode;
  className?: string;
}

const FormButton = ({ children, className, ...props }: FormButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button color='default' type='submit' isLoading={pending} className={className} {...props}>
      {children}
    </Button>
  );
};

export default FormButton;
