import { fetcher } from '@/lib/fetcher';
import { PaymentSummary, UpdatePayment } from '@/interfaces/api/PaymentSummary';
import { AcceptedCurrency } from '@/types/AcceptedCurrency';

const API_URL = 'https://api.sandbox.bvnk.com/api/v1'; // TODO: Move to env file

export const getPaymentSummary = async (uuid: string) => {
  const data = await fetcher<PaymentSummary>(`${API_URL}/pay/${uuid}/summary`, { method: 'GET' });

  return data;
};

export const updatePayment = async (uuid: string, currency: AcceptedCurrency) => {
  const requestBody: UpdatePayment = {
    currency,
    payInMethod: 'crypto'
  };

  const data = await fetcher<PaymentSummary>(`${API_URL}/pay/${uuid}/update/summary`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  return data;
};

export const acceptPayment = async (uuid: string) => {
  const requestBody = {
    successUrl: 'no_url'
  };

  const data = await fetcher<PaymentSummary>(`${API_URL}/pay/${uuid}/accept/summary`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  return data;
};
