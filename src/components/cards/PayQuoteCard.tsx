'use client';

import { ellipsifyMiddle } from '@/utils/text';
import { Card, CardTitle } from '../base/Card';
import { DividedColumn } from '../base/DividedColumn';
import { CopyToClipboard } from '../base/CopyToClipboard';

interface PayQuoteCardProps {
  currency: string;
  amount: number;
  address: string;
}

export const PayQuoteCard = ({ currency, amount, address }: PayQuoteCardProps) => {
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
          <span>12:12:00</span>
        </div>
      </DividedColumn>
    </Card>
  );
};
