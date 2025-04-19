import { Card, CardTitle } from '@/components/base/Card';
import { CircleAlertIcon } from '@/components/icons/CircleAlertIcon';
import { TextSecondary } from '@/components/typography/TextSecondary';

const Error = () => {
  return (
    <Card className="gap-5 p-15">
      <CircleAlertIcon />
      <CardTitle className="font-medium">Not found</CardTitle>
      <TextSecondary className="text-center">Could not find requested resource</TextSecondary>
    </Card>
  );
};

export default Error;
