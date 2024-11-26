'use client';

import { FaCreditCard } from 'react-icons/fa';
import { useVerifyCreditCard } from 'src/apiBridge/verifyCreditCard/verifyCreditCard';
import { SmartInput } from 'src/components/SmartInput';
import { Status } from 'src/components/SmartInput/types';

export default function Home() {
  const {
    trigger: verifyCreditCard,
    isMutating: pendingVerification,
    error: verificationError,
    data: verificationData,
  } = useVerifyCreditCard();

  const getStatus = (): Status | undefined => {
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

  const getVerificationMessage = () => {
    if (verificationError) {
      return verificationError.message;
    }
    if (verificationData && !verificationData.cardIsValid) {
      return 'Invalid credit card';
    }
    return '';
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex justify-center w-full">
          <div className="flex-col items-center justify-center">
            <div className="animate-bounce">
              <FaCreditCard size={100} className="rotate-90 fill-amber-700" />
            </div>

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <rect x="10" y="10" width="80" height="10" rx="5" ry="5" />
              </svg>
            </div>
          </div>
        </div>

        <form
          onSubmit={async e => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const creditCard = formData.get('creditCard');

            verifyCreditCard({
              candidate: creditCard as string,
            });
          }}>
          <div className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <SmartInput
              label="Credit Card"
              name="creditCard"
              type="text"
              className="grow"
              placeholder="Daisy"
              required
              status={getStatus()}
              onChangeValidator={function (value: string): void {
                console.log(value);
              }}
              lazyValidator={async function (value: string) {
                verifyCreditCard({
                  candidate: value,
                });
              }}
            />

            <div className="label">
              <span className="label-text-alt">{getVerificationMessage()}</span>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
