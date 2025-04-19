import clsx from 'clsx';

interface TextSecondaryProps {
  children: React.ReactNode;
  className?: string;
}

export const TextSecondary = ({ children, className }: TextSecondaryProps) => {
  return <span className={clsx('text-text-secondary font-light', className)}>{children}</span>;
};
