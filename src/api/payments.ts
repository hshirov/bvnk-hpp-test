import { PaymentSummary, UpdatePayment } from '@/interfaces/api/PaymentSummary';
import { AcceptedCurrency } from '@/types/AcceptedCurrency';

const API_URL = 'https://api.sandbox.bvnk.com/api/v1'; // TODO: Move to env file

export const getPaymentSummary = async (uuid: string) => {
  const response = await fetch(`${API_URL}/pay/${uuid}/summary`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch payment summary');
  }

  const data = await response.json();

  return data as PaymentSummary;
};

export const updatePayment = async (uuid: string, currency: AcceptedCurrency) => {
  const requestBody: UpdatePayment = {
    currency,
    payInMethod: 'crypto'
  };

  const response = await fetch(`${API_URL}/pay/${uuid}/update/summary`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    throw new Error('Failed to update payment summary');
  }

  const data = await response.json();

  return data as PaymentSummary;
};
