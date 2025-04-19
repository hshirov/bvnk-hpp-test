'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { ellipsifyMiddle } from '@/utils/text';
import { formatTimestamp } from '@/utils/time';
import { CURRENCY_OPTIONS } from '@/constants/currencies';
import { Card, CardTitle } from '../base/Card';
import { DividedColumn } from '../base/DividedColumn';
import { CopyToClipboard } from '../base/CopyToClipboard';
import { Column } from '../base/Column';

interface PayQuoteCardProps {
  uuid: string;
  currency: string;
  amount: number;
  address: string;
  addressUri: string;
  timeLeft: number;
}

export const PayQuoteCard = ({
  uuid,
  currency,
  amount,
  address,
  addressUri,
  timeLeft
}: PayQuoteCardProps) => {
  const router = useRouter();
  const [timeLeftCountdown, setTimeLeftCountdown] = useState<number>(timeLeft);

  const currencyName = CURRENCY_OPTIONS.find((item) => item.value === currency)?.title;

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
      <CardTitle>Pay with {currencyName || currency}</CardTitle>

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

        <div className="flex w-full flex-col items-center gap-6 py-3">
          <div className="flex w-full justify-between">
            <span className="text-text-secondary font-light">{currency} address</span>
            <CopyToClipboard textToCopy={address}>{ellipsifyMiddle(address)}</CopyToClipboard>
          </div>

          <Column className="gap-3">
            <QRCodeSVG
              value={addressUri}
              size={140}
            />
            <span className="text-text-secondary text-xs font-light">{address}</span>
          </Column>
        </div>

        <div className="flex w-full justify-between py-3">
          <span className="text-text-secondary font-light">Time left to pay</span>
          <span>{formatTimestamp(timeLeftCountdown)}</span>
        </div>
      </DividedColumn>
    </Card>
  );
};
