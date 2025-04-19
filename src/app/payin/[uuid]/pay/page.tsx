import { redirect } from 'next/navigation';
import { getPaymentSummary } from '@/api/payments';
import { isValidUUID } from '@/utils/validation';

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
    throw Error('Quote not accepted');
  }

  return <div></div>;
};

export default PayQuotePage;
