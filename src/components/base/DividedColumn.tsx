import clsx from 'clsx';
import { Column } from './Column';

interface DividedColumnProps {
  children: React.ReactNode;
  className?: string;
}

export const DividedColumn = ({ children, className }: DividedColumnProps) => {
  return (
    <Column
      className={clsx(
        'divide-light-border border-light-border w-full divide-y border-t border-b',
        className
      )}
    >
      {children}
    </Column>
  );
};
