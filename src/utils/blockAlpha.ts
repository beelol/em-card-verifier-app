import { KeyboardEventHandler } from 'react';

export function doesNotMatchPattern(value: string, pattern: RegExp): boolean {
  return !pattern.test(value);
}

export const creditCardPattern: RegExp = /^\d+$/;

export function notCreditCard(value: string): boolean {
  return doesNotMatchPattern(value, creditCardPattern);
}

export const blockAlpha: KeyboardEventHandler<HTMLInputElement> = event => {
  const input = event.target as HTMLInputElement;
  const value = input.value + event.key;

  if (notCreditCard(value)) {
    event.preventDefault();
  }
};
