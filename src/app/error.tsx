'use client';

import { useEffect } from 'react';
import { Button } from '@/components/base/Button';
import { Card, CardTitle } from '@/components/base/Card';
import { CircleAlertIcon } from '@/components/icons/CircleAlertIcon';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    // TODO: Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Card className="gap-5 p-15">
      <CircleAlertIcon />
      <CardTitle className="font-medium">Something went wrong</CardTitle>
      <Button onClick={reset}>Try again</Button>
    </Card>
  );
};

export default Error;
