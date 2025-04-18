'use client';

import { Card, CardTitle } from '@/components/base/Card';
import { CircleAlertIcon } from '@/components/icons/CircleAlertIcon';
import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Card className="gap-5 p-15">
      <CircleAlertIcon />
      <CardTitle className="font-medium">Something went wrong</CardTitle>
      <button onClick={reset}>Try again</button>
    </Card>
  );
}
