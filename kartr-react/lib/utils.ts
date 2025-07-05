import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export interface ICustomError extends Omit<Error, 'stack'> {
  code?: number | undefined;
}

export interface IAppReturnType {
  status: boolean;
  message: string;
  statusCode?: number;
}
export type ErrorType = IAppReturnType | Record<string, string>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatError(error: unknown): ErrorType {
  let message;
  let statusCode;
  // if (error && isAxiosError<AxiosErrorMessageType>(error) && error.response) {
  //   statusCode = error.response.status;
  //   message = error.response.data?.name || error.response.data?.message;
  // }
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    'code' in error
  ) {
    statusCode = error.code as number;
    message = error.message as string;
  } else {
    message = 'An unknown error occurred';
    statusCode = 500;
  }
  return {
    message,
    statusCode,
    status: false,
  };
}

export function customError(message: string, code?: number) {
  const error = new Error(message) as ICustomError;
  error.code = code ?? undefined;
  return error;
}

export function formatQuery(
  payload: Record<string, string | number | boolean>
): string {
  let toReturn = '?';
  for (const key in payload) {
    toReturn += `${key}=${payload[key]}&`;
  }
  return toReturn.slice(0, -1);
}

export function isObject(
  value: Record<string, unknown> | { [key: string]: { [key: string]: string } }
): boolean {
  return !!value && value.constructor === Object;
}
