import { IconType } from 'react-icons';
import {
  FaCcAmex,
  FaCcDiscover,
  FaCcMastercard,
  FaCcVisa,
  FaCreditCard,
} from 'react-icons/fa';
import { CreditCardType } from 'src/systems/cardDetection/types';

export const cardIconMap: Record<CreditCardType, IconType> = {
  visa: FaCcVisa,
  mastercard: FaCcMastercard,
  amex: FaCcAmex,
  discover: FaCcDiscover,
  unknown: FaCreditCard,
};
