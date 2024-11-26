import useSWRMutation from 'swr/mutation';
import { IVerifyCardRequest, IVerifyCardResponse } from './types';

const BASE_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3000';

const fetcher = async (
  url: string,
  options: Readonly<{ arg: IVerifyCardRequest }>,
) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.arg),
  });

  return response.json();
};

export const useVerifyCreditCard = () => {
  const mutation = useSWRMutation<
    IVerifyCardResponse,
    Error,
    string,
    IVerifyCardRequest
  >(`${BASE_API_URL}/verify`, fetcher);

  return mutation;
};
