import { Card, CardTitle } from '@/components/base/Card';
import { Column } from '@/components/base/Column';

interface AcceptQuoteCardProps {
  title: string;
  priceAmount: number;
  currency: string;
  referenceNumber: string;
}

export const AcceptQuoteCard = ({
  title,
  priceAmount,
  currency,
  referenceNumber
}: AcceptQuoteCardProps) => {
  return (
    <Card>
      <Column className="gap-1">
        <CardTitle>{title}</CardTitle>
        <div className="font-semibold">
          <span className="mr-1 text-3xl">{priceAmount}</span>{' '}
          <span className="text-xl">{currency}</span>
        </div>
      </Column>

      <div className="text-sm">
        <span className="text-text-secondary">For reference number:</span>{' '}
        <span className="font-medium">{referenceNumber}</span>
      </div>
    </Card>
  );
};
