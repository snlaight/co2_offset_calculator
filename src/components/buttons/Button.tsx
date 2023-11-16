'use client';

import React, { useState } from 'react';
import { Button, type ButtonProps } from '@nextui-org/react';

import cn from '@/utils/helpers/cn';

type CustomButtonProps = Omit<ButtonProps, 'color'>

const DefaultStyle = 'inline-flex items-center py-0 py-4 text-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-950';

interface ButtonComponentProps extends CustomButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gradient';
  isLoading?: boolean;
  disabled?: boolean;
  props?: CustomButtonProps;
}

const ButtonComponent = ({
  children,
  color = 'default',
  className,
  onClick,
  isLoading = false,
  disabled = false,
  ...props
}: ButtonComponentProps) => {
  const [loading, setLoading] = useState(false);

  const loadingStatus = isLoading || loading;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disabled || loadingStatus) return;

    setLoading(true);

    if (onClick) {
      await onClick(e);
    }

    setLoading(false);
  };

  const ButtonVariants = {
    default: cn(DefaultStyle, 'bg-primary-500 hover:bg-primary-600 text-white'),
    secondary: cn(DefaultStyle, 'bg-secondary-500 hover:bg-secondary-600 text-white'),
    success: cn(DefaultStyle, 'bg-success-500 hover:bg-success-600 text-white'),
    warning: cn(DefaultStyle, 'bg-secondary-300 hover:bg-secondary-400 text-primary-950'),
    error: cn(DefaultStyle, 'bg-red-500 hover:bg-red-600 text-white'),
    gradient: cn(DefaultStyle, 'bg-gradient-to-r from-primary-300 to-secondary-300'),
  };

  return (
    <Button
      className={cn(disabled && 'cursor-not-allowed', ButtonVariants[color as keyof typeof ButtonVariants], className)}
      isDisabled={disabled || loadingStatus}
      isLoading={loadingStatus}
      onClick={() => handleClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
