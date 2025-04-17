export const acceptedCurrencies = ['BTC', 'ETH', 'LTC'] as const;

export type AcceptedCurrency = (typeof acceptedCurrencies)[number];
