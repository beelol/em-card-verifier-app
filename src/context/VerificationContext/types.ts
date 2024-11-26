import {
  IVerifyCardRequest,
  IVerifyCardResponse,
} from 'src/apiBridge/verifyCreditCard';

// Context and hook for global pending verification state
export interface VerificationContextType {
  verificationResponse: IVerifyCardResponse | null;
  isVerifying: boolean;
  verifyCard: (request: IVerifyCardRequest) => Promise<void>;
}
