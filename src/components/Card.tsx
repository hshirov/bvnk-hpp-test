interface CardProps {
  title: string;
  priceAmount: number;
  currency: string;
  referenceNumber: string;
}

export const Card = ({ title, priceAmount, currency, referenceNumber }: CardProps) => {
  return (
    <div className="bg-card-background rounded-card max-w-card-width flex w-full flex-col items-center justify-center gap-6 p-6">
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-xl font-medium">{title}</h2>
        <div className="font-semibold">
          <span className="mr-1 text-3xl">{priceAmount}</span>{' '}
          <span className="text-xl">{currency}</span>
        </div>
      </div>

      <div className="text-sm">
        <span className="text-text-secondary">For reference number:</span>{' '}
        <span className="font-medium">{referenceNumber}</span>
      </div>
    </div>
  );
};
