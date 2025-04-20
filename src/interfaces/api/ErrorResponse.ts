import { ErrorCode } from '@/types/ErrorCode';

export interface Error {
  code: ErrorCode;
  message: string;
  parameter: string;
  requestId: string | null;
}

export interface ErrorResponse {
  errorList: Error[];
  requestId: string;
}
