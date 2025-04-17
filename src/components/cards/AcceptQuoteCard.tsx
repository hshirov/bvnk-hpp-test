'use client';

import { useState } from 'react';
import { Card, CardTitle } from '@/components/base/Card';
import { Column } from '@/components/base/Column';
import { Select } from '@/components/base/Select';
import { AcceptedCurrency } from '@/types/AcceptedCurrency';

interface AcceptQuoteCardProps {
  title: string;
  priceAmount: number;
  currency: string;
  referenceNumber: string;
}

interface CurrencyOption {
  title: string;
  value: AcceptedCurrency;
}

const CURRENCY_OPTIONS: CurrencyOption[] = [
  { title: 'Bitcoin', value: 'BTC' },
  { title: 'Ethereum', value: 'ETH' },
  { title: 'Litecoin', value: 'LTC' }
];

export const AcceptQuoteCard = ({
  title,
  priceAmount,
  currency,
  referenceNumber
}: AcceptQuoteCardProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<AcceptedCurrency | ''>('');

  const handleCurrencyChange = (selectedValue: string) => {
    setSelectedCurrency(selectedValue as AcceptedCurrency);
  };

  return (
    <Card>
      <Column className="gap-1">
        <CardTitle>{title}</CardTitle>
        <div className="font-medium">
          <span className="mr-1 text-3xl">{priceAmount}</span>{' '}
          <span className="text-xl">{currency}</span>
        </div>
      </Column>

      <div className="text-sm">
        <span className="text-text-secondary font-light">For reference number:</span>{' '}
        <span>{referenceNumber}</span>
      </div>

      <Column className="w-full items-start gap-1">
        <p className="text-sm">Pay with</p>
        <Select
          options={CURRENCY_OPTIONS}
          selectedValue={selectedCurrency}
          placeholder="Select Currency"
          onChange={handleCurrencyChange}
        />
      </Column>
    </Card>
  );
};
