'use client';

import { FaCreditCard } from 'react-icons/fa';
import { CreditCardForm } from 'src/components/CreditCardForm/CreditCardForm';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-0 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
        <CreditCardForm />
      </main>
    </div>
  );
}
