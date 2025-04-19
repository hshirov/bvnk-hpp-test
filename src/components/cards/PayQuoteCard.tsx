'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ellipsifyMiddle } from '@/utils/text';
import { formatTimestamp } from '@/utils/time';
import { Card, CardTitle } from '../base/Card';
import { DividedColumn } from '../base/DividedColumn';
import { CopyToClipboard } from '../base/CopyToClipboard';

interface PayQuoteCardProps {
  uuid: string;
  currency: string;
  amount: number;
  address: string;
  timeLeft: number;
}

export const PayQuoteCard = ({ uuid, currency, amount, address, timeLeft }: PayQuoteCardProps) => {
  const router = useRouter();
  const [timeLeftCountdown, setTimeLeftCountdown] = useState<number>(timeLeft);

  useEffect(() => {
    if (timeLeftCountdown <= 0) {
      return router.replace(`/payin/${uuid}/expired`);
    }

    const intervalId = setInterval(() => {
      setTimeLeftCountdown(Math.max(timeLeftCountdown - 1000, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeftCountdown, uuid, router]);

  return (
    <Card>
      <CardTitle>Pay with {currency}</CardTitle>

      <p className="text-text-secondary max-w-72 text-center text-sm font-light">
        To complete this payment send the amount due to the {currency} address provided below.
      </p>

      <DividedColumn className="text-sm">
        <div className="flex w-full justify-between py-3">
          <span className="text-text-secondary font-light">Amount due</span>
          <CopyToClipboard textToCopy={amount}>
            {amount} {currency}
          </CopyToClipboard>
        </div>

        <div className="flex w-full justify-between py-3">
          <span className="text-text-secondary font-light">{currency} address</span>
          <CopyToClipboard textToCopy={address}>{ellipsifyMiddle(address)}</CopyToClipboard>
        </div>

        <div className="flex w-full justify-between py-3">
          <span className="text-text-secondary font-light">Time left to pay</span>
          <span>{formatTimestamp(timeLeftCountdown)}</span>
        </div>
      </DividedColumn>
    </Card>
  );
};
