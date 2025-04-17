import { getPaymentSummary } from '@/api/payments';
import { AcceptQuoteCard } from '@/components/cards/AcceptQuoteCard';
import { PaymentExpiredCard } from '@/components/cards/PaymentExpiredCard';
import { isValidUUID } from '@/utils/validation';
import { notFound } from 'next/navigation';

const AcceptQuotePage = async ({ params }: { params: Promise<{ uuid: string }> }) => {
  const { uuid } = await params;

  if (!isValidUUID(uuid)) {
    notFound(); // TODO: Add 404 page
  }

  const payment = await getPaymentSummary(uuid);

  if (payment.status === 'EXPIRED') {
    return <PaymentExpiredCard />;
  }

  return (
    <AcceptQuoteCard
      title={payment.merchantDisplayName}
      priceAmount={payment.displayCurrency.amount}
      currency={payment.displayCurrency.currency}
      referenceNumber={payment.reference}
    />
  );
};

export default AcceptQuotePage;
