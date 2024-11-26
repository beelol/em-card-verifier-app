import React, { useState, useEffect, useRef } from 'react';
import { ISmartInputProps } from './types';
import { blockAlpha, notCreditCard } from 'src/utils/blockAlpha';

export const SmartInput: React.FC<ISmartInputProps> = ({
  onChangeValidator,
  lazyValidator,
  status,
  className,
  label,
  ...inputProps
}) => {
  const [value, setValue] = useState('');
  const [isInteracting, setIsInteracting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lazyValidatorRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    if (isInteracting) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        lazyValidatorRef.current = lazyValidator(value);
        setIsInteracting(false);
      }, 2000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isInteracting, value, lazyValidator]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (notCreditCard(newValue)) {
      e.preventDefault();
      return;
    }

    setValue(newValue);
    onChangeValidator(newValue);
    setIsInteracting(true);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    if (e.target.value === '' || e.target.value === undefined) {
      return;
    }

    setIsInteracting(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    lazyValidatorRef.current = lazyValidator(value);
  };

  const getStatusClassName = () => {
    switch (status) {
      case 'success':
        return 'input-success';
      case 'error':
        return 'input-error';
      default:
        return '';
    }
  };

  const combinedClassName = `${className || ''}`.trim();

  return (
    <label
      className={`${getStatusClassName()} input input-bordered flex items-center gap-2`}>
      {label}
      <input
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={blockAlpha}
        // onFocus={() => setIsInteracting(true)}
        disabled={status === 'pending'}
        className={combinedClassName}
        {...inputProps}
      />
    </label>
  );
};
