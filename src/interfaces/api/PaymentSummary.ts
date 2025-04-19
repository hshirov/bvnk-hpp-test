import { AcceptedCurrency } from '@/types/AcceptedCurrency';

interface CurrencyData {
  amount: number;
  actual: number;
  currency: string;
}

export interface PaymentSummary {
  expiryDate: number;
  acceptanceExpiryDate: number;
  merchantDisplayName: string;
  displayCurrency: CurrencyData;
  paidCurrency: CurrencyData;
  reference: string;
  status: 'EXPIRED' | 'PENDING';
  quoteStatus: 'TEMPLATE' | 'ACCEPTED';
}

export interface UpdatePayment {
  currency: AcceptedCurrency;
  payInMethod: string;
}
