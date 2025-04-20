import { ApiError } from '@/lib/fetcher';
import { ErrorCode } from '@/types/ErrorCode';

const EXPIRED_CODES: ErrorCode[] = ['MER-PAY-2004', 'MER-PAY-2017'];

export const isExpiredError = (error: unknown) =>
  error instanceof ApiError && error.codes.some((code) => EXPIRED_CODES.includes(code));
