import { Column } from '@/components/Column';

interface CardProps {
  title: string;
  priceAmount: number;
  currency: string;
  referenceNumber: string;
}

export const Card = ({ title, priceAmount, currency, referenceNumber }: CardProps) => {
  return (
    <Column className="bg-card-background rounded-card max-w-card-width w-full gap-6 p-6">
      <Column className="gap-1">
        <h2 className="text-xl font-medium">{title}</h2>
        <div className="font-semibold">
          <span className="mr-1 text-3xl">{priceAmount}</span>{' '}
          <span className="text-xl">{currency}</span>
        </div>
      </Column>

      <div className="text-sm">
        <span className="text-text-secondary">For reference number:</span>{' '}
        <span className="font-medium">{referenceNumber}</span>
      </div>
    </Column>
  );
};
