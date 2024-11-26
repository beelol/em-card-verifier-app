import { IVerifyCardResponse } from 'src/apiBridge/verifyCreditCard';
import { Status } from 'src/types/verificationStatus';

interface GetStatusParams {
  pendingVerification: boolean;
  verificationError: boolean;
  verificationData?: IVerifyCardResponse;
}

export const getStatus = ({
  pendingVerification,
  verificationError,
  verificationData,
}: GetStatusParams): Status | undefined => {
  if (pendingVerification) {
    return 'pending';
  }

  if (verificationError) {
    return 'error';
  }

  if (verificationData?.cardIsValid) {
    return 'success';
  }

  if (verificationData?.cardIsValid === false) {
    return 'error';
  }
};
