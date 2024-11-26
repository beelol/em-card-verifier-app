import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SmartInput } from './SmartInput';
import { ISmartInputProps } from './types';

describe('SmartInput', () => {
  const defaultProps: ISmartInputProps = {
    onChange: jest.fn(),
    lazyValidator: jest.fn().mockResolvedValue(undefined),
    label: 'Credit Card Number',
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render correctly with basic props', () => {
    render(<SmartInput {...defaultProps} />);
    expect(screen.getByLabelText(/credit card number/i)).toBeTruthy();
  });

  it('should call onChangeValidator immediately on input change', () => {
    render(<SmartInput {...defaultProps} />);
    const input = screen.getByLabelText(/credit card number/i);

    fireEvent.change(input, { target: { value: '4242' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('4242');
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('should not call lazyValidator before timeout', () => {
    render(<SmartInput {...defaultProps} />);
    const input = screen.getByLabelText(/credit card number/i);

    fireEvent.change(input, { target: { value: '4242' } });
    act(() => {
      jest.advanceTimersByTime(1500); // Less than 2000ms timeout
    });

    expect(defaultProps.lazyValidator).not.toHaveBeenCalled();
  });

  it('should call lazyValidator after timeout', () => {
    render(<SmartInput {...defaultProps} />);
    const input = screen.getByLabelText(/credit card number/i);

    fireEvent.change(input, { target: { value: '4242' } });
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(defaultProps.lazyValidator).toHaveBeenCalledWith('4242');
    expect(defaultProps.lazyValidator).toHaveBeenCalledTimes(1);
  });

  it('should reset timer on subsequent input changes', () => {
    render(<SmartInput {...defaultProps} />);
    const input = screen.getByLabelText(/credit card number/i);

    fireEvent.change(input, { target: { value: '4242' } });
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    fireEvent.change(input, { target: { value: '4242424' } });
    act(() => {
      jest.advanceTimersByTime(1500); // Still less than 2000ms from last change
    });

    expect(defaultProps.lazyValidator).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500); // Waited full 2000ms since last change
    });

    expect(defaultProps.lazyValidator).toHaveBeenCalledWith('4242424');
    expect(defaultProps.lazyValidator).toHaveBeenCalledTimes(1);
  });

  it('should cancel timer when input is cleared', () => {
    render(<SmartInput {...defaultProps} />);
    const input = screen.getByLabelText(/credit card number/i);

    fireEvent.change(input, { target: { value: '4242' } });
    fireEvent.change(input, { target: { value: '' } });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(defaultProps.lazyValidator).not.toHaveBeenCalled();
  });

  it('should immediately validate on blur', () => {
    render(<SmartInput {...defaultProps} />);
    const input = screen.getByLabelText(/credit card number/i);

    fireEvent.change(input, { target: { value: '4242' } });
    fireEvent.blur(input);

    expect(defaultProps.lazyValidator).toHaveBeenCalledWith('4242');
    expect(defaultProps.lazyValidator).toHaveBeenCalledTimes(1);
  });

  it('should not validate on blur if input is empty', () => {
    render(<SmartInput {...defaultProps} />);
    const input = screen.getByLabelText(/credit card number/i);

    fireEvent.blur(input);
    expect(defaultProps.lazyValidator).not.toHaveBeenCalled();
  });

  it('should block non-credit card characters', () => {
    render(<SmartInput {...defaultProps} />);
    const input = screen.getByLabelText(/credit card number/i);

    fireEvent.change(input, { target: { value: 'abc123' } });
    expect((input as HTMLInputElement).value).toBe('');

    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('should apply correct status classes', () => {
    const { rerender } = render(
      <SmartInput {...defaultProps} status="success" />,
    );
    const wrapper = screen.getByLabelText(/credit card number/i).parentElement;
    expect(wrapper?.classList.contains('input-success')).toBe(true);

    rerender(<SmartInput {...defaultProps} status="error" />);
    expect(wrapper?.classList.contains('input-error')).toBe(true);
  });

  it('should disable input when status is pending', () => {
    render(<SmartInput {...defaultProps} status="pending" />);
    const input = screen.getByLabelText(/credit card number/i);
    expect((input as HTMLInputElement).disabled).toBe(true);
  });
});
