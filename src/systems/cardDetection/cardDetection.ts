import { cardPatterns } from './cardPatterns';
import { CreditCardType } from './types';

export const detectCardType = (cardNumber: string): CreditCardType => {
  for (const [type, pattern] of Object.entries(cardPatterns)) {
    if (pattern.test(cardNumber)) {
      return type as CreditCardType;
    }
  }

  return 'unknown';
};
