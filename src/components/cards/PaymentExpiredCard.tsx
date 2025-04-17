import { Card, CardTitle } from '@/components/base/Card';
import { CircleAlertIcon } from '@/components/icons/CircleAlertIcon';

export const PaymentExpiredCard = () => {
  return (
    <Card className="gap-5 p-15">
      <CircleAlertIcon />
      <CardTitle className="font-medium">Payment details expired</CardTitle>
      <p className="text-text-secondary text-center font-light">
        The payment details for your transaction have expired.
      </p>
    </Card>
  );
};
