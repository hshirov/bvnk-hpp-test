import clsx from 'clsx';
import { Column } from '@/components/base/Column';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ className, children }: CardProps) => {
  return (
    <Column
      className={clsx(
        'bg-card-background rounded-card max-w-card-width w-full gap-6 p-6',
        className
      )}
    >
      {children}
    </Column>
  );
};

export const CardTitle = ({ children, className }: CardTitleProps) => (
  <h2 className={clsx('text-xl', className)}>{children}</h2>
);
