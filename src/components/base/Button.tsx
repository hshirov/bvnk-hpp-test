import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: ButtonVariant;
}

export const Button = ({
  children,
  className,
  isLoading = false,
  disabled = false,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  const variantStyles: { [key in ButtonVariant]: string } = {
    primary:
      'bg-primary hover:bg-primary-hover active:bg-primary-active rounded-sm px-4 py-2 text-sm text-white w-full',
    link: 'text-primary'
  };

  return (
    <button
      className={clsx(
        'inline-flex cursor-pointer items-center justify-center',
        {
          'pointer-events-none cursor-not-allowed opacity-50': isLoading,
          'pointer-events-none cursor-pointer': disabled
        },
        variantStyles[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  );
};
