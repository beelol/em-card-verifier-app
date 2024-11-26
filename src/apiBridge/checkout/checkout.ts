import { useState } from 'react';
import { useVerificationContext } from 'src/context/VerificationContext/VerificationContext';

export const useCheckout = () => {
  const { trigger: verifyCreditCard, data: verificationData } =
    useVerificationContext();

  const [checkoutPending, setSubmitPending] = useState(false);

  const checkout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitPending(true);
    const formData = new FormData(e.currentTarget);
    const creditCard = formData.get('creditCard');

    let validCard = verificationData?.cardIsValid;

    if (!validCard) {
      const verifyResponse = await verifyCreditCard({
        candidate: creditCard as string,
      });

      validCard = verifyResponse?.cardIsValid;
    }

    if (!validCard) {
      setSubmitPending(false);

      throw new Error('Invalid credit card. Please try again.');
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    setSubmitPending(false);
  };

  return { checkout, checkoutPending };
};
