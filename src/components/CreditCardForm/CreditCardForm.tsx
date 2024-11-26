import { SmartInput } from '../SmartInput';
import { getStatus } from 'src/app/utils/getStatus';
import { useVerificationContext } from 'src/context/VerificationContext/VerificationContext';
import { useCheckout } from 'src/apiBridge/checkout';
import { getVerificationMessage } from 'src/app/utils/getVerificationMessage';
import { BiCart } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { DynamicCardIcon } from '../DynamicCardIcon';

export const CreditCardForm = () => {
  const { checkout, checkoutPending } = useCheckout();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await checkout(e);
      toast.success('Payment successful!');
    } catch (error: unknown) {
      let message = 'Unknown Error';

      if (error instanceof Error) message = error.message;

      toast.error(message);
    }
  };

  const {
    trigger: verifyCreditCard,
    isMutating: pendingVerification,
    error: verificationError,
    data: verificationData,
  } = useVerificationContext();

  useEffect(() => {
    if (verificationError || verificationData?.cardIsValid === false) {
      toast.error('Invalid credit card. Please try again.');
    }
  }, [verificationError, verificationData]);

  const submitUnavailable =
    pendingVerification ||
    verificationError !== undefined ||
    verificationData?.cardIsValid === false ||
    checkoutPending;

  const [cardNumber, setCardNumber] = useState('');

  return (
    <form onSubmit={onSubmit}>
      <div className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <SmartInput
          label="Card"
          name="creditCard"
          type="text"
          className="grow"
          placeholder="Daisy"
          icon={<DynamicCardIcon cardNumber={cardNumber} size={26} />}
          required
          status={getStatus({
            pendingVerification,
            verificationError: Boolean(verificationError),
            verificationData,
          })}
          onChange={(value: string) => {
            setCardNumber(value);
          }}
          lazyValidator={async (value: string) => {
            verifyCreditCard({
              candidate: value,
            });
          }}
        />

        <div className="label">
          <span className="label-text-alt">
            {getVerificationMessage({
              verificationError,
              verificationData,
            })}
          </span>
        </div>

        <div className="flex w-full mt-2">
          <button
            type="submit"
            disabled={submitUnavailable}
            className={`btn flex-1 ${
              submitUnavailable ? 'btn-disabled' : 'btn-success text-white'
            }`}>
            {checkoutPending ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <BiCart size={20} />
            )}
            Checkout
          </button>
        </div>
      </div>
    </form>
  );
};
