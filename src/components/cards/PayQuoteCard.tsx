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
import { TextSecondary } from '../typography/TextSecondary';

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

      <TextSecondary className="max-w-72 text-center text-sm">
        To complete this payment send the amount due to the {currency} address provided below.
      </TextSecondary>

      <DividedColumn className="text-sm">
        <div className="flex w-full justify-between py-3">
          <TextSecondary>Amount due</TextSecondary>
          <CopyToClipboard textToCopy={amount}>
            {amount} {currency}
          </CopyToClipboard>
        </div>

        <div className="flex w-full flex-col items-center gap-6 py-3">
          <div className="flex w-full justify-between">
            <TextSecondary>{currency} address</TextSecondary>
            <CopyToClipboard textToCopy={address}>{ellipsifyMiddle(address)}</CopyToClipboard>
          </div>

          <Column className="gap-3">
            <QRCodeSVG
              value={addressUri}
              size={140}
            />
            <TextSecondary className="text-xs">{address}</TextSecondary>
          </Column>
        </div>

        <div className="flex w-full justify-between py-3">
          <TextSecondary>Time left to pay</TextSecondary>
          <span>{formatTimestamp(timeLeftCountdown)}</span>
        </div>
      </DividedColumn>
    </Card>
  );
};
