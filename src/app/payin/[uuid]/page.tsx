import { redirect } from 'next/navigation';
import { getPaymentSummary } from '@/api/payments';
import { AcceptQuoteCard } from '@/components/cards/AcceptQuoteCard';
import { isValidUUID } from '@/utils/validation';

const AcceptQuotePage = async ({ params }: { params: Promise<{ uuid: string }> }) => {
  const { uuid } = await params;

  if (!isValidUUID(uuid)) {
    throw new Error('Invalid UUID');
  }

  const payment = await getPaymentSummary(uuid);

  if (payment.status === 'EXPIRED') {
    redirect(`/payin/${uuid}/expired`);
  }
  if (payment.quoteStatus === 'ACCEPTED') {
    redirect(`/payin/${uuid}/pay`);
  }

  return (
    <AcceptQuoteCard
      uuid={uuid}
      title={payment.merchantDisplayName}
      priceAmount={payment.displayCurrency.amount}
      currency={payment.displayCurrency.currency}
      referenceNumber={payment.reference}
    />
  );
};

export default AcceptQuotePage;
