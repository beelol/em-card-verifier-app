import { CardPatterns } from './types';

export const cardPatterns: CardPatterns = {
  // Starts with 4, lengths of 13, 16, or 19
  visa: /^4\d{12}(?:\d{3}|\d{6})?$/,

  // Starts with 51-55 or 2221-2720
  mastercard:
    /^(5[1-5]\d{14}|222[1-9]\d{12}|22[3-9]\d{13}|2[3-6]\d{14}|27[0-1]\d{13}|2720\d{12})$/,

  // Starts with 34 or 37, length of 15
  amex: /^3[47]\d{13}$/,

  // Starts with 6011, 644-649, 65, or 622126-622925
  discover:
    /^(6011\d{12}|64[4-9]\d{13}|65\d{14}|622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[0-1]\d|92[0-5])\d{10})$/,
};
