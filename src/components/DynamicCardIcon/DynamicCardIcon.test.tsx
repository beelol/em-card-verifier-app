import React from 'react';
import { render } from '@testing-library/react';
import { DynamicCardIcon } from './DynamicCardIcon';

const mockFaCcVisa = jest.fn();

jest.mock('react-icons/fa', () => ({
  FaCcVisa: (props: React.SVGProps<SVGSVGElement>) => {
    mockFaCcVisa(props);
    return <svg {...props} data-testid="fa-cc-visa" />;
  },

  FaCcMastercard: () => null,
  FaCcAmex: () => null,
  FaCcDiscover: () => null,
  FaCreditCard: () => null,
}));

describe('DynamicCardIcon', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <DynamicCardIcon cardNumber="4111111111111111" />,
    );
    expect(container).toBeTruthy();
  });

  it('applies custom size prop', () => {
    render(<DynamicCardIcon cardNumber="4111111111111111" size={32} />);

    expect(mockFaCcVisa).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 32,
      }),
    );
  });

  it('applies custom className', () => {
    const { container } = render(
      <DynamicCardIcon
        cardNumber="4111111111111111"
        className="custom-class"
      />,
    );

    const svg = container.querySelector('.custom-class');
    expect(svg).toBeTruthy();
  });
});
