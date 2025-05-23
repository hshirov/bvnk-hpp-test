'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardTitle } from '@/components/base/Card';
import { Column } from '@/components/base/Column';
import { Select } from '@/components/base/Select';
import { AcceptedCurrency } from '@/types/AcceptedCurrency';
import { acceptPayment, updatePayment } from '@/api/payments';
import { formatTimestamp } from '@/utils/time';
import { isExpiredError } from '@/utils/errors';
import { CURRENCY_OPTIONS } from '@/constants/currencies';
import { Spinner } from '../base/Spinner';
import { DividedColumn } from '../base/DividedColumn';
import { Button } from '../base/Button';
import { TextSecondary } from '../typography/TextSecondary';

interface AcceptQuoteCardProps {
  uuid: string;
  title: string;
  priceAmount: number;
  currency: string;
  referenceNumber: string;
}

export const AcceptQuoteCard = ({
  uuid,
  title,
  priceAmount,
  currency,
  referenceNumber
}: AcceptQuoteCardProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedCurrency, setSelectedCurrency] = useState<AcceptedCurrency | ''>('');
  const [amountDue, setAmountDue] = useState<number | null>(null);
  const [acceptanceTimeLeft, setAcceptanceTimeLeft] = useState<number | null>(null);
  const [isConfirmPending, setIsConfirmPending] = useState<boolean>(false);

  const canShowPaymentDetails = (amountDue !== null && acceptanceTimeLeft !== null) || isPending;

  const refreshQuote = useCallback(
    (currency: AcceptedCurrency) => {
      startTransition(async () => {
        let updatedData;
        try {
          updatedData = await updatePayment(uuid, currency);
        } catch (error) {
          if (isExpiredError(error)) {
            return router.replace(`/payin/${uuid}/expired`);
          } else {
            throw error;
          }
        }

        const timeLeft = Math.max(updatedData.acceptanceExpiryDate - Date.now(), 0);
        startTransition(() => {
          setAcceptanceTimeLeft(timeLeft);
          setAmountDue(updatedData.paidCurrency.amount);
        });
      });
    },
    [uuid, router]
  );

  const handleCurrencyChange = (selectedValue: string) => {
    setSelectedCurrency(selectedValue as AcceptedCurrency);
    refreshQuote(selectedValue as AcceptedCurrency);
  };

  const handleSubmit = async () => {
    setIsConfirmPending(true);
    try {
      await acceptPayment(uuid);
      router.replace(`/payin/${uuid}/pay`);
    } catch (error) {
      if (isExpiredError(error)) {
        router.replace(`/payin/${uuid}/expired`);
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    if (acceptanceTimeLeft === null || selectedCurrency === '' || isConfirmPending) {
      return;
    }
    if (acceptanceTimeLeft <= 0) {
      return refreshQuote(selectedCurrency);
    }

    const intervalId = setInterval(() => {
      setAcceptanceTimeLeft(Math.max(acceptanceTimeLeft - 1000, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [acceptanceTimeLeft, selectedCurrency, refreshQuote, isConfirmPending]);

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
        <TextSecondary>For reference number:</TextSecondary> <span>{referenceNumber}</span>
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
            <TextSecondary>Amount due</TextSecondary>
            {isPending ? (
              <Spinner />
            ) : (
              <span>
                {amountDue} {selectedCurrency}
              </span>
            )}
          </div>

          <div className="flex w-full justify-between py-3">
            <TextSecondary>Quoted price expires in</TextSecondary>
            {isPending ? <Spinner /> : <span>{formatTimestamp(acceptanceTimeLeft!)}</span>}
          </div>
        </DividedColumn>
      )}

      {canShowPaymentDetails && !isPending && (
        <Button
          isLoading={isConfirmPending}
          onClick={handleSubmit}
        >
          Confirm
        </Button>
      )}
    </Card>
  );
};
