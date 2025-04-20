import { Error as IError, ErrorResponse } from '@/interfaces/api/ErrorResponse';
import { ErrorCode } from '@/types/ErrorCode';

export class ApiError extends Error {
  constructor(
    public messages: string[],
    public codes: ErrorCode[],
    public data?: ErrorResponse | IError
  ) {
    super(messages[0]);
    this.name = 'ApiError';
    this.codes = codes;
    this.data = data;
  }
}

const defaultMessages = ['Request failed'];

export const fetcher = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, init);

  if (!response.ok) {
    const body: ErrorResponse | IError = await response.json().catch(() => ({}));

    if ('errorList' in body) {
      const messages = body.errorList.map((error) => error.message);
      const codes = body.errorList.map((error) => error.code);

      throw new ApiError(messages || defaultMessages, codes, body);
    }

    throw new ApiError(body.message ? [body.message] : defaultMessages, [body.code], body);
  }

  const data = await response.json();

  return data as T;
};
