import { PaymentSummary } from '@/interfaces/api/PaymentSummary';

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
