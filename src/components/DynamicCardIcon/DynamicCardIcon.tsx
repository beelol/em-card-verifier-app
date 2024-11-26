import { detectCardType } from 'src/systems/cardDetection/cardDetection';
import { cardIconMap } from './utils';
import { CreditCardIconProps } from './types';

export const DynamicCardIcon: React.FC<CreditCardIconProps> = ({
  cardNumber,
  size = 24,
  className = '',
}) => {
  const cardType = detectCardType(cardNumber);
  const IconComponent = cardIconMap[cardType];

  return <IconComponent size={size} className={className} />;
};
