'use client';

import { useFormStatus } from 'react-dom';

import Button from '@/components/buttons/Button';

interface FormButtonProps {
  children: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  onPress?: () => void;
}

const FormButton = ({ children, className, isDisabled, onPress, ...props }: FormButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      color='default'
      type='submit'
      isLoading={pending}
      className={className}
      disabled={isDisabled}
      onPress={onPress}
      {...props}
    >
      {children}
    </Button>
  );
};

export default FormButton;
