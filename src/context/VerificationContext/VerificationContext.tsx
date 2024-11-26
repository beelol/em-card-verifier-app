'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import { useVerifyCreditCard } from 'src/apiBridge/verifyCreditCard';

const VerificationContext = createContext<
  ReturnType<typeof useVerifyCreditCard> | undefined
>(undefined);

export const useVerificationContext = () => {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error(
      'useVerificationContext must be used within a VerificationProvider',
    );
  }
  return context;
};

interface VerificationProviderProps {
  children: ReactNode;
}

export const VerificationProvider = ({
  children,
}: VerificationProviderProps) => {
  const mutation = useVerifyCreditCard();

  return (
    <VerificationContext.Provider value={mutation}>
      {children}
    </VerificationContext.Provider>
  );
};
