interface CurrencyData {
  amount: number;
  actual: number;
  currency: string;
}

export interface PaymentSummary {
  expiryDate: number;
  merchantDisplayName: string;
  displayCurrency: CurrencyData;
  reference: string;
  status: 'EXPIRED' | 'PENDING';
}
