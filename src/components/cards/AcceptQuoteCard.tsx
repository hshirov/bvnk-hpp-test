'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import { Card, CardTitle } from '@/components/base/Card';
import { Column } from '@/components/base/Column';
import { Select } from '@/components/base/Select';
import { AcceptedCurrency } from '@/types/AcceptedCurrency';
import { CurrencyOption } from '@/interfaces/CurrencyOption';
import { updatePayment } from '@/api/payments';
import { formatTimestamp } from '@/utils/time';
import { Spinner } from '../base/Spinner';
import { DividedColumn } from '../base/DividedColumn';

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
  const [isPending, startTransition] = useTransition();
  const [selectedCurrency, setSelectedCurrency] = useState<AcceptedCurrency | ''>('');
  const [amountDue, setAmountDue] = useState<number | null>(null);
  const [acceptanceTimeLeft, setAcceptanceTimeLeft] = useState<number | null>(null);

  const canShowPaymentDetails =
    (amountDue !== null && acceptanceTimeLeft !== null && acceptanceTimeLeft > 0) || isPending;

  const refreshQuote = useCallback(
    (currency: AcceptedCurrency) => {
      startTransition(async () => {
        const updatedData = await updatePayment(uuid, currency);
        const timeLeft = Math.max(updatedData.acceptanceExpiryDate - Date.now(), 0);
        startTransition(() => {
          setAcceptanceTimeLeft(timeLeft);
          setAmountDue(updatedData.paidCurrency.amount);
        });
      });
    },
    [uuid]
  );

  const handleCurrencyChange = (selectedValue: string) => {
    setSelectedCurrency(selectedValue as AcceptedCurrency);
    refreshQuote(selectedValue as AcceptedCurrency);
  };

  useEffect(() => {
    if (acceptanceTimeLeft === null || selectedCurrency === '') {
      return;
    }
    if (acceptanceTimeLeft <= 0) {
      refreshQuote(selectedCurrency);
      return;
    }

    const intervalId = setInterval(() => {
      setAcceptanceTimeLeft(Math.max(acceptanceTimeLeft - 1000, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [acceptanceTimeLeft, selectedCurrency, refreshQuote]);

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
          placeholder="Select Currency"
          options={CURRENCY_OPTIONS}
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        />
      </Column>

      {canShowPaymentDetails && (
        <DividedColumn className="text-sm">
          <div className="flex w-full justify-between py-3">
            <span className="text-text-secondary font-light">Amount due</span>
            {isPending ? (
              <Spinner />
            ) : (
              <span>
                {amountDue} {selectedCurrency}
              </span>
            )}
          </div>

          <div className="flex w-full justify-between py-3">
            <span className="text-text-secondary font-light">Quoted price expires in</span>
            {isPending ? <Spinner /> : <span>{formatTimestamp(acceptanceTimeLeft!)}</span>}
          </div>
        </DividedColumn>
      )}
    </Card>
  );
};
