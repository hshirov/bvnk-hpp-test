import { Card, CardTitle } from '@/components/base/Card';
import { CircleAlertIcon } from '@/components/icons/CircleAlertIcon';
import { TextSecondary } from '../typography/TextSecondary';

export const PaymentExpiredCard = () => {
  return (
    <Card className="gap-5 p-15">
      <CircleAlertIcon />
      <CardTitle className="font-medium">Payment details expired</CardTitle>
      <TextSecondary className="text-center">
        The payment details for your transaction have expired.
      </TextSecondary>
    </Card>
  );
};
