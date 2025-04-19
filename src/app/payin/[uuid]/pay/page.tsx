import { redirect } from 'next/navigation';
import { getPaymentSummary } from '@/api/payments';
import { isValidUUID } from '@/utils/validation';
import { PayQuoteCard } from '@/components/cards/PayQuoteCard';

const PayQuotePage = async ({ params }: { params: Promise<{ uuid: string }> }) => {
  const { uuid } = await params;

  if (!isValidUUID(uuid)) {
    throw new Error('Invalid UUID');
  }

  const payment = await getPaymentSummary(uuid);

  if (payment.status === 'EXPIRED') {
    redirect(`/payin/${uuid}/expired`);
  }
  if (payment.quoteStatus !== 'ACCEPTED') {
    redirect(`/payin/${uuid}`);
  }

  const timeLeftToPay = Math.max(payment.expiryDate - Date.now(), 0);

  return (
    <PayQuoteCard
      uuid={uuid}
      currency={payment.paidCurrency.currency}
      amount={payment.paidCurrency.amount}
      address={payment.address.address}
      timeLeft={timeLeftToPay}
    />
  );
};

export default PayQuotePage;
