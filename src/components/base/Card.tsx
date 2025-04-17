import clsx from 'clsx';
import { Column } from '@/components/base/Column';

interface CardProps {
  children: React.ReactNode;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children }: CardProps) => {
  return (
    <Column className="bg-card-background rounded-card max-w-card-width w-full gap-6 p-6">
      {children}
    </Column>
  );
};

export const CardTitle = ({ children, className }: CardTitleProps) => (
  <h2 className={clsx('text-xl font-medium', className)}>{children}</h2>
);
