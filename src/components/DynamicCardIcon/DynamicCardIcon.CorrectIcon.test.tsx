import { render } from '@testing-library/react';
import { DynamicCardIcon } from './DynamicCardIcon';

jest.mock('react-icons/fa', () => ({
  FaCcVisa: () => <div data-testid="visa-icon" />,
  FaCcMastercard: () => <div data-testid="mastercard-icon" />,
  FaCcAmex: () => <div data-testid="amex-icon" />,
  FaCcDiscover: () => <div data-testid="discover-icon" />,
  FaCreditCard: () => <div data-testid="unknown-icon" />,
}));

describe('DynamicCardIcon', () => {
  it('renders Visa icon for Visa card numbers', () => {
    const { getByTestId, queryByTestId } = render(
      <DynamicCardIcon cardNumber="4111111111111111" />,
    );

    expect(getByTestId('visa-icon')).toBeTruthy();
    expect(queryByTestId('mastercard-icon')).toBeNull();
    expect(queryByTestId('amex-icon')).toBeNull();
    expect(queryByTestId('discover-icon')).toBeNull();
    expect(queryByTestId('unknown-icon')).toBeNull();
  });

  it('renders Mastercard icon for Mastercard numbers', () => {
    const { getByTestId, queryByTestId } = render(
      <DynamicCardIcon cardNumber="5555555555554444" />,
    );

    expect(getByTestId('mastercard-icon')).toBeTruthy();
    expect(queryByTestId('visa-icon')).toBeNull();
    expect(queryByTestId('amex-icon')).toBeNull();
    expect(queryByTestId('discover-icon')).toBeNull();
    expect(queryByTestId('unknown-icon')).toBeNull();
  });

  it('renders Amex icon for American Express numbers', () => {
    const { getByTestId, queryByTestId } = render(
      <DynamicCardIcon cardNumber="371449635398431" />,
    );

    expect(getByTestId('amex-icon')).toBeTruthy();
    expect(queryByTestId('visa-icon')).toBeNull();
    expect(queryByTestId('mastercard-icon')).toBeNull();
    expect(queryByTestId('discover-icon')).toBeNull();
    expect(queryByTestId('unknown-icon')).toBeNull();
  });

  it('renders Discover icon for Discover card numbers', () => {
    const { getByTestId, queryByTestId } = render(
      <DynamicCardIcon cardNumber="6011111111111117" />,
    );

    expect(getByTestId('discover-icon')).toBeTruthy();
    expect(queryByTestId('visa-icon')).toBeNull();
    expect(queryByTestId('mastercard-icon')).toBeNull();
    expect(queryByTestId('amex-icon')).toBeNull();
    expect(queryByTestId('unknown-icon')).toBeNull();
  });
});
