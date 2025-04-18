'use client';

import { useState } from 'react';
import { Card, CardTitle } from '@/components/base/Card';
import { Column } from '@/components/base/Column';
import { Select } from '@/components/base/Select';
import { AcceptedCurrency } from '@/types/AcceptedCurrency';
import { CurrencyOption } from '@/interfaces/CurrencyOption';
import { updatePayment } from '@/api/payments';

interface AcceptQuoteCardProps {
  uuid: string;
  title: string;
  priceAmount: number;
  currency: string;
  referenceNumber: string;
}

const CURRENCY_OPTIONS: CurrencyOption[] = [
  { title: 'Bitcoin', value: 'BTC' },
  { title: 'Ethereum', value: 'ETH' },
  { title: 'Litecoin', value: 'LTC' }
];

export const AcceptQuoteCard = ({
  uuid,
  title,
  priceAmount,
  currency,
  referenceNumber
}: AcceptQuoteCardProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<AcceptedCurrency | ''>('');

  const handleCurrencyChange = async (selectedValue: string) => {
    setSelectedCurrency(selectedValue as AcceptedCurrency);
    const updatedData = await updatePayment(uuid, selectedValue as AcceptedCurrency);

    console.log(updatedData);
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
          value={selectedCurrency}
          placeholder="Select Currency"
          onChange={handleCurrencyChange}
        />
      </Column>
    </Card>
  );
};
