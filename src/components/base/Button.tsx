import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = ({ children, className, isLoading = false, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'bg-primary hover:bg-primary-hover active:bg-primary-active inline-flex w-full cursor-pointer items-center justify-center rounded-sm px-4 py-2 text-sm text-white',
        className,
        { 'pointer-events-none cursor-not-allowed opacity-50': isLoading }
      )}
      disabled={isLoading}
      {...props}
    >
      {children}
    </button>
  );
};
