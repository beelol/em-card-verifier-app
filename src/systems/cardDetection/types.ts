export type CreditCardType =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'discover'
  | 'unknown';

export interface CardPatterns {
  [key: string]: RegExp;
}
