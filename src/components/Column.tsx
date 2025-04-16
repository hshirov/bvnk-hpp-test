import clsx from 'clsx';

interface ColumnProps {
  className?: string;
  children: React.ReactNode;
}

export const Column = ({ className, children }: ColumnProps) => {
  return <div className={clsx('flex flex-col items-center', className)}>{children}</div>;
};
