import { type NextRequest, NextResponse } from 'next/server';
import { formatError, customError, isObject } from '@/lib/utils';

const url = `/api/v1/auth/signup`;

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    if (!isObject(requestBody)) throw customError('Invalid Params', 401);
    const result = await fetch(url, {
      method: 'POST',
      headers: {},
      body: requestBody,
    });
    const response = await result.json();
    return NextResponse.json({ ...response, statusCode: response.status });
  } catch (err: unknown) {
    return NextResponse.json(formatError(err));
  }
}
