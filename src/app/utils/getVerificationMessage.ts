import { IVerifyCardResponse } from 'src/apiBridge/verifyCreditCard';

export interface GetVerificationMessageParams {
  verificationError?: Error;
  verificationData?: IVerifyCardResponse;
}

export const getVerificationMessage = ({
  verificationError,
  verificationData,
}: GetVerificationMessageParams) => {
  if (verificationError) {
    return verificationError.message;
  }

  if (verificationData && !verificationData.cardIsValid) {
    return 'Invalid credit card';
  }

  return '';
};
